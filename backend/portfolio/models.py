import uuid
import json



from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    class Category(models.TextChoices):
        FULLSTACK = "fullstack", "Full Stack"
        MOBILE = "mobile", "Mobile"
        AI = "ai", "AI"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_desc = models.CharField(max_length=240)
    description = models.TextField()
    tech_stack_json = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    @property
    def tech_stack(self):
        if not self.tech_stack_json:
            return []
        try:
            return json.loads(self.tech_stack_json)
        except json.JSONDecodeError:
            return []

    @tech_stack.setter
    def tech_stack(self, value):
        self.tech_stack_json = json.dumps(value)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Skill(models.Model):
    class Category(models.TextChoices):
        FRONTEND = "frontend", "Frontend"
        BACKEND = "backend", "Backend"
        MOBILE = "mobile", "Mobile"
        AI = "ai", "AI"
        TOOLS = "tools", "Tools"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    icon_url = models.URLField(blank=True)
    proficiency_level = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        default=70,
        help_text="Proficiency score from 1-100.",
    )

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return self.name


class Experience(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=180)
    company = models.CharField(max_length=180)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    achievements_json = models.TextField(blank=True, default="[]")

    class Meta:
        ordering = ["-start_date"]

    @property
    def achievements(self):
        if not self.achievements_json:
            return []
        try:
            return json.loads(self.achievements_json)
        except json.JSONDecodeError:
            # If the data is malformed, return an empty list
            return []

    @achievements.setter
    def achievements(self, value):
        self.achievements_json = json.dumps(value)

    def __str__(self):
        return f"{self.title} @ {self.company}"


class Education(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    degree = models.CharField(max_length=180)
    institution = models.CharField(max_length=180)
    start_year = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1900), MaxValueValidator(2100)]
    )
    end_year = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        validators=[MinValueValidator(1900), MaxValueValidator(2100)],
    )
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["-start_year"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.name} ({self.email})"


class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_desc = models.CharField(max_length=240)
    category = models.CharField(max_length=50)
    read_time = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    image_url = models.URLField(blank=True)
    images_json = models.TextField(blank=True, default="[]")
    story = models.TextField()
    highlights_json = models.TextField(blank=True, default="[]")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ["-created_at"]

    @property
    def images(self):
        if not self.images_json:
            return []
        try:
            return json.loads(self.images_json)
        except json.JSONDecodeError:
            return []

    @images.setter
    def images(self, value):
        self.images_json = json.dumps(value)

    @property
    def highlights(self):
        if not self.highlights_json:
            return []
        try:
            return json.loads(self.highlights_json)
        except json.JSONDecodeError:
            return []

    @highlights.setter
    def highlights(self, value):
        self.highlights_json = json.dumps(value)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
