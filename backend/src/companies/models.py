from django.db import models
from django.conf import settings
# Create your models here.
class company(models.Model):
    companyId = models.CharField(max_length=20,unique=True)
    companyName = models.CharField(max_length=100,unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True)
    plan = models.CharField(max_length=30)
    branches = models.IntegerField(default=0)
    expiryDate=models.DateField(null=True)