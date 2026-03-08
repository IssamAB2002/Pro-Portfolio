import bleach
import markdown
from rest_framework import serializers

from .models import Blog, Project, Skill, Education, Experience, ContactMessage


class ProjectSerializer(serializers.ModelSerializer):
    description_html = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "short_desc",
            "description",
            "description_html",
            "tech_stack",
            "image_url",
            "images",
            "live_url",
            "github_url",
            "category",
            "created_at",
            "updated_at",
        ]

    def get_description_html(self, obj):
        allowed_tags = [
            'p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'br',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'code', 'pre'
        ]
        allowed_attrs = {
            '*': ['class'],
            'a': ['href', 'title'],
            'img': ['src', 'alt', 'title'],
        }
        
        html = markdown.markdown(obj.description, extensions=['extra', 'nl2br'])
        return bleach.clean(html, tags=allowed_tags, attributes=allowed_attrs)


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]
