from django.db import models

# Create your models here.
class invoice(models.Model):
    invoiceId = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=200,blank=True)
    customer_number = models.CharField(max_length=20,blank=True)
    customer_address = models.CharField(max_length=200,blank=True)
    total_price = models.CharField(max_length=20)
    net_price = models.CharField(max_length=20)
    paid = models.CharField(max_length=20)
    balance = models.CharField(max_length=20)
    discount = models.CharField(max_length=20)
    transactionType = models.CharField(max_length=20)
    companyId = models.CharField(max_length=50,null=True)
    branchId = models.CharField(max_length=50,null=True)
    date = models.DateField(null=True)