import json

from django.test import TestCase, override_settings
from django.urls import reverse

from .models import ContactMessage, Education, Project, Skill


@override_settings(
    CACHES={
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "test-cache",
        }
    }
)
class PortfolioApiTests(TestCase):
    def setUp(self):
        Project.objects.create(
            title="Portfolio Platform",
            short_desc="Production-ready portfolio platform",
            description="Detailed description",
            tech_stack=["Django", "React"],
            category=Project.Category.FULLSTACK,
        )
        Skill.objects.create(name="Django", category=Skill.Category.BACKEND, proficiency_level=90)
        Education.objects.create(
            degree="BSc Computer Science",
            institution="Example University",
            start_year=2018,
            end_year=2022,
            description="Software engineering focus",
        )

    def test_project_list_returns_payload(self):
        response = self.client.get(reverse("project-list"))
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(len(body), 1)
        self.assertIn("technologies", body[0])

    def test_skill_list_returns_items(self):
        response = self.client.get(reverse("skill-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_education_list_returns_items(self):
        response = self.client.get(reverse("education-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_contact_submission_creates_message(self):
        payload = {
            "fullName": "Jane Doe",
            "email": "jane@example.com",
            "service": "Web App Development",
            "budget": "$5k-$10k",
            "timeline": "6 weeks",
            "phone": "+15551234567",
            "message": "I need a production web app with admin support.",
        }
        response = self.client.post(
            reverse("contact-message-create"),
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_contact_submission_rejects_invalid_email(self):
        payload = {"fullName": "Jane Doe", "email": "bad-email", "message": "Hello there world"}
        response = self.client.post(
            reverse("contact-message-create"),
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_contact_submission_rate_limit(self):
        payload = {
            "fullName": "Jane Doe",
            "email": "jane@example.com",
            "message": "Valid message with enough characters.",
        }
        for _ in range(5):
            response = self.client.post(
                reverse("contact-message-create"),
                data=json.dumps(payload),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, 201)

        blocked = self.client.post(
            reverse("contact-message-create"),
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(blocked.status_code, 429)
