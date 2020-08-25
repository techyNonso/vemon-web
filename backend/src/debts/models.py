from django.db import models

# Create your models here.
class debt(models.Model):
     date = models.DateField()
     customer = models.CharField(max_length=50)
     phone = models.CharField(max_length=50)
     attender = models.CharField(max_length=50)
     address = models.CharField(max_length=200, null=True)
     amount = models.IntegerField()
     paid = models.IntegerField()
     balance = models.IntegerField()

    