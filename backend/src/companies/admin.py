from django.contrib import admin
from companies.models import company
from django.contrib.auth.models import Group

#set your admin page listing
class CompaniesAdmin(admin.ModelAdmin):
    ordering= ('id',)
    list_display = ('id','companyId','companyName','owner','plan','branches','expiryDate')
    search_fields = ('companyName','companyId')
    readonly_fields = ()


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

# Register your models here.
admin.site.register(company,CompaniesAdmin)
