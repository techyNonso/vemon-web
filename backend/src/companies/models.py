from django.db import models

# Create your models here.
class company(models.Model):
    companyId = models.CharField(max_length=20)
    companyName = models.CharField(max_length=20)
    userId = models.CharField(max_length=20)
    plan = models.CharField(max_length=30)
    branches = models.CharField(max_length=10)