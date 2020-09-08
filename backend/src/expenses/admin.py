from django.contrib import admin
from expenses.models import expense
from django.contrib.auth.models import Group


# Register your models here.
admin.site.register(expense)
