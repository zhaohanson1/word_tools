from django.db import models

# Create your models here.
class ToolMetadata(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=140)
    url = models.CharField(max_length=30)