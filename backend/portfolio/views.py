import json

from django.core.cache import cache
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_http_methods

from .models import ContactMessage, Education, Project, Skill


@require_GET
def project_list(request):
    projects = Project.objects.all().values(
        "id",
        "title",
        "slug",
        "short_desc",
        "description",
        "tech_stack",
        "image_url",
        "live_url",
        "github_url",
        "category",
        "created_at",
        "updated_at",
    )
    payload = []
    for project in projects:
        payload.append(
            {
                **project,
                "technologies": project.get("tech_stack", []),
            }
        )
    return JsonResponse(payload, safe=False)


@require_GET
def skill_list(request):
    skills = list(
        Skill.objects.all().values(
            "id",
            "name",
            "category",
            "icon_url",
            "proficiency_level",
        )
    )
    return JsonResponse(skills, safe=False)


import logging

logger = logging.getLogger(__name__)

@require_GET
def home_skill_list(request):
    try:
        preferred_names = ["React", "Django", "Python", "PostgreSQL", "REST APIs"]
        all_skills = list(
            Skill.objects.all().values(
                "id",
                "name",
                "category",
                "icon_url",
                "proficiency_level",
            )
        )

        selected = []
        used_ids = set()

        for name in preferred_names:
            match = next((skill for skill in all_skills if skill["name"] == name), None)
            if match and match["id"] not in used_ids:
                selected.append(match)
                used_ids.add(match["id"])

        if len(selected) < 5:
            fallback = sorted(
                (
                    skill
                    for skill in all_skills
                    if skill["id"] not in used_ids and skill["category"] in {"frontend", "backend", "tools"}
                ),
                key=lambda skill: skill.get("proficiency_level", 0),
                reverse=True,
            )
            for skill in fallback:
                selected.append(skill)
                if len(selected) == 5:
                    break
        
        return JsonResponse(selected[:5], safe=False)
    except Exception as e:
        logger.error("Error in home_skill_list view: %s", e, exc_info=True)
        return JsonResponse({"detail": "An internal error occurred."}, status=500)


@require_GET
def education_list(request):
    education = list(
        Education.objects.all().values(
            "id",
            "degree",
            "institution",
            "start_year",
            "end_year",
            "description",
        )
    )
    return JsonResponse(education, safe=False)


def _client_ip(request):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


@require_http_methods(["POST"])
def contact_message_create(request):
    rate_limit = 5
    rate_window_seconds = 3600
    ip = _client_ip(request)
    rate_key = f"contact:rate:{ip}"

    current_count = cache.get(rate_key, 0)
    if current_count >= rate_limit:
        return JsonResponse(
            {"detail": "Rate limit exceeded. Please try again later."},
            status=429,
        )

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON payload."}, status=400)

    full_name = str(payload.get("fullName", "")).strip()
    email = str(payload.get("email", "")).strip()
    message = str(payload.get("message", "")).strip()
    service = str(payload.get("service", "")).strip()
    budget = str(payload.get("budget", "")).strip()
    timeline = str(payload.get("timeline", "")).strip()
    phone = str(payload.get("phone", "")).strip()

    if len(full_name) < 2 or len(full_name) > 120:
        return JsonResponse({"detail": "Full name must be between 2 and 120 characters."}, status=400)

    try:
        validate_email(email)
    except Exception:
        return JsonResponse({"detail": "Invalid email address."}, status=400)

    if len(message) < 10 or len(message) > 4000:
        return JsonResponse({"detail": "Message must be between 10 and 4000 characters."}, status=400)

    if len(service) > 120 or len(budget) > 120 or len(timeline) > 120 or len(phone) > 80:
        return JsonResponse({"detail": "One or more fields exceed the maximum allowed length."}, status=400)

    composed_message = (
        f"Service: {service or 'N/A'}\n"
        f"Budget: {budget or 'N/A'}\n"
        f"Timeline: {timeline or 'N/A'}\n"
        f"Phone: {phone or 'N/A'}\n\n"
        f"{message}"
    )

    ContactMessage.objects.create(
        name=full_name,
        email=email,
        message=composed_message,
    )

    if cache.add(rate_key, 1, timeout=rate_window_seconds):
        pass
    else:
        try:
            cache.incr(rate_key)
        except ValueError:
            cache.set(rate_key, 1, timeout=rate_window_seconds)

    return JsonResponse({"detail": "Message submitted successfully."}, status=201)
