from django.db import models

# Create your models here.
class stockActivity(models.Model):
    date = models.DateField(null=True)
    activity = models.CharField(max_length=20)
    detail = models.CharField(max_length=200)
    editor = models.CharField(max_length=50)
    editorId = models.CharField(max_length=20)
    batchId = models.CharField(max_length=20)
    companyId = models.CharField(max_length=50,null=True)
    branchId = models.CharField(max_length=50,null=True)
    