from django.contrib import admin
from stock.models import stock
from django.contrib.auth.models import Group


# Register your models here.
admin.site.register(stock)
