from django.urls import path

from .views import (
    contact_message_create,
    education_list,
    home_skill_list,
    project_list,
    skill_list,
)

urlpatterns = [
    path("projects/", project_list, name="project-list"),
    path("skills/", skill_list, name="skill-list"),
    path("skills/home/", home_skill_list, name="home-skill-list"),
    path("education/", education_list, name="education-list"),
    path("contact/", contact_message_create, name="contact-message-create"),
]
