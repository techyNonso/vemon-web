from django.db import models

# Create your models here.
class staff(models.Model):
    staffId = models.CharField(max_length=10)
    staffName = models.CharField(max_length=30)
    position = models.CharField(max_length=30)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=20)
    permission = models.CharField(max_length=30)
    registered = models.DateField()
    state = models.CharField(max_length=20)
    town = models.CharField(max_length=50)
    street = models.CharField(max_length=50)