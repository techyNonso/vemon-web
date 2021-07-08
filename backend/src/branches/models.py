from django.db import models
from django.conf import settings

# Create your models here.
class branch(models.Model):
    branchId = models.CharField(max_length=20)
    state = models.CharField(max_length=20,blank=True)
    street = models.CharField(max_length=20,blank=True)
    town = models.CharField(max_length=20,blank=True)
    address = models.CharField(max_length=300,blank=True)
    phone = models.CharField(max_length=20,blank=True)
    companyId = models.CharField(max_length=20)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True)