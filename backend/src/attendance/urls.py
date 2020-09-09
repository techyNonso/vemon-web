from django.urls import path
from .views import attendanceHandler, attendanceDetail, companyAttendance

urlpatterns = [
    path('attendance/',attendanceHandler),
    path('attendance/company/<str:company>/<str:branch>/',companyAttendance),
    path('attendance/<int:pk>/',attendanceDetail)
]
