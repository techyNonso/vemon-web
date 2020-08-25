from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('attendance.urls')),
    path('',include('debts.urls')),
    path('',include('expenses.urls'))
]
