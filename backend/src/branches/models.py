from django.db import models

# Create your models here.
class branch(models.Model):
    branchId = models.CharField(max_length=20,unique=True)
    state = models.CharField(max_length=20,blank=True)
    street = models.CharField(max_length=20,blank=True)
    town = models.CharField(max_length=20,blank=True)
    phone = models.CharField(max_length=20,blank=True)
    companyId = models.CharField(max_length=20)
    userId = models.CharField(max_length=20)