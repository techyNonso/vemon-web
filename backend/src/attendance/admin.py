from django.contrib import admin
from attendance.models import attendance
from django.contrib.auth.models import Group


#set your admin page listing
class AttendanceAdmin(admin.ModelAdmin):
    ordering= ('id',)
    list_display = ('date','staffName','staffId','arrivalTime','exitTime','companyId','branchId','storageId')
    search_fields = ('staffName','staffId')
    readonly_fields = ('arrivalTime','exitTime')


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    
# Register your models here.
admin.site.register(attendance,AttendanceAdmin)
admin.site.unregister(Group)