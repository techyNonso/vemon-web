from django.db import models

# Create your models here.
class attendance(models.Model):
    staffId = models.CharField(max_length=10)
    staffName = models.CharField(max_length=100)
    arrivalTime = models.CharField(max_length=10)
    exitTime = models.CharField(max_length=10)
