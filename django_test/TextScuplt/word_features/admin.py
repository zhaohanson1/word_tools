from django.contrib import admin

from .models import ToolMetadata
# Register your models here.

class ToolMetadataAdmin(admin.ModelAdmin):
    fields = ['name', 'description', 'url']

admin.site.register(ToolMetadata, ToolMetadataAdmin)