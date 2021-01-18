from django.db import models

# Create your models here.
class expense(models.Model):
    date = models.DateField()
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200)
    amount = models.IntegerField ()
    companyId = models.CharField(max_length=50,null=True)
    branchId = models.CharField(max_length=50,null=True)
   