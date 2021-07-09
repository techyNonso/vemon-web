from django.db import models
from django.conf import settings
# Create your models here.

class pricing(models.Model):
    plan = models.CharField(max_length=20)
    price= models.IntegerField(default=0)
    branches_allowed = models.IntegerField(default=0)
    code = models.IntegerField(default=0)