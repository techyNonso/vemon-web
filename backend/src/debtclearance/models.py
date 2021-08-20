from django.db import models

# Create your models here.
class debtClearance(models.Model):
     date = models.DateField()
     invoiceId = models.CharField(max_length=50,null=True)
     paid = models.CharField(max_length=50,null=True)
     attender = models.CharField(max_length=200)
     companyId = models.CharField(max_length=50,null=True)
     branchId = models.CharField(max_length=50,null=True)
   
    