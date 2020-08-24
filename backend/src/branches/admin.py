from django.contrib import admin
from branches.models import branch
from django.contrib.auth.models import Group

#set your admin page listing
class BranchesAdmin(admin.ModelAdmin):
    ordering= ('id',)
    list_display = ('branchId','state','street','town','phone','companyId','userId')
    search_fields = ('state','town','street','companyId','userId')
    readonly_fields = ()


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

# Register your models here.
admin.site.register(branch,BranchesAdmin)
