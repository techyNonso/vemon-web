from django.urls import path
from .views import attendanceHandler, attendanceDetail

urlpatterns = [
    path('attendance/',attendanceHandler),
    path('attendance/<int:pk>/',attendanceDetail)
]
