from django.contrib import admin
from staff.models import staff, staff_updates
from django.contrib.auth.models import Group


# Register your models here.
admin.site.register(staff)
admin.site.register(staff_updates)
