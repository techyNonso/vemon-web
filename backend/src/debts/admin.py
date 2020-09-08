from django.contrib import admin
from debts.models import debt
from django.contrib.auth.models import Group

# Register your models here.
admin.site.register(debt)
