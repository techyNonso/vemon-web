from django.db import models

# Create your models here.
class stock(models.Model):
    productName = models.CharField(max_length=50)
    productId = models.CharField(max_length=20)
    quantity = models.IntegerField()
    batchId = models.CharField(max_length=10)
    expiryDate = models.DateField(blank=True)
    unit = models.CharField(max_length=10)
    ppmu = models.CharField(max_length=10)
    price = models.CharField(max_length=10)
    #expDate = models.DateField()
    companyId = models.CharField(max_length=50,null=True)
    branchId = models.CharField(max_length=50,null=True)
    