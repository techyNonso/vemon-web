from django.contrib import admin
from branches.models import branch
from django.contrib.auth.models import Group

#set your admin page listing
class BranchesAdmin(admin.ModelAdmin):
    ordering= ('id',)
    list_display = ('branchId','address','state','street','town','phone','companyId','owner')
    search_fields = ('state','town','street','companyId','owner')
    readonly_fields = ()


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

# Register your models here.
admin.site.register(branch,BranchesAdmin)
