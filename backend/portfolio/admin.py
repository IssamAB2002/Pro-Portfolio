from django.contrib import admin

from .models import ContactMessage, Education, Experience, Project, Skill


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "tech_stack", "live_url")
    search_fields = ("title", "description")
    list_filter = ("category",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    search_fields = ("name",)
    list_filter = ("category",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "start_date", "end_date")
    date_hierarchy = "start_date"


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "start_year", "end_year")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "timestamp")
    search_fields = ("name", "email")
    readonly_fields = ("timestamp",)
    ordering = ("-timestamp",)


admin.site.site_header = "Issam Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Dashboard"
