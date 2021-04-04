from django.contrib import admin
from invoices.models import invoice
from django.contrib.auth.models import Group


# Register your models here.
admin.site.register(invoice)
