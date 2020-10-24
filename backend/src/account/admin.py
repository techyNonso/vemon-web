from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from account.models import Account


#set your admin page listing
class AccountAdmin(BaseUserAdmin):
    ordering= ('email',)
    list_display = ('email','first_name','last_name','phone','date_joined','expiration_limit','stock_limit','last_login','is_active','is_admin','is_staff','is_emailvalidated','is_phonevalidated','is_superuser')
    search_fields = ('email','first_name','last_name')
    readonly_fields = ('date_joined','last_login')
    

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ((None,{'fields':('email','first_name','last_name','phone','date_joined','expiration_limit','stock_limit','last_login','is_active','is_admin','is_staff','is_emailvalidated','is_phonevalidated','is_superuser')}),)
    add_fieldsets =((None, {'classes': ('wide',),'fields':('email','first_name','last_name','phone','date_joined','expiration_limit','stock_limit','last_login','is_active','is_admin','is_staff','is_emailvalidated','is_phonevalidated','is_superuser'),}),)
# Register your models here.
admin.site.register(Account, AccountAdmin)
