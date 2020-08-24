from django.db import models

# Create your models here.
class sale(models.Model):
    productId = models.CharField(max_length=20)
    productName = models.CharField(max_length=50)
    quantity = models.IntegerField()
    price = models.IntegerField()
    disccount = models.IntegerField()
    transactionType = models.CharField(max_length=20)