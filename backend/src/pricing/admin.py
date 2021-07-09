from django.contrib import admin
from  .models import pricing
from django.contrib.auth.models import Group

class PricingAdmin(admin.ModelAdmin):
    ordering = ('id',)
    list_display = ('plan','price','branches_allowed','code')
    search_fields = ('plan',)
    readonly_fields = ()

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

#Register your models here.
admin.site.register(pricing,PricingAdmin)
