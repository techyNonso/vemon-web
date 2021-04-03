from django.db import models

# Create your models here.
class sale(models.Model):
    productId = models.CharField(max_length=20)
    invoiceId = models.CharField(null=True,max_length=100)
    productName = models.CharField(max_length=50)
    quantity = models.IntegerField()
    price = models.IntegerField()
    #paid = models.IntegerField(default=0)
    #toPay = models.IntegerField(default=0)
    #disccount = models.IntegerField()
    transactionType = models.CharField(max_length=20)
    companyId = models.CharField(max_length=50,null=True)
    branchId = models.CharField(max_length=50,null=True)
    date = models.DateField(null=True)