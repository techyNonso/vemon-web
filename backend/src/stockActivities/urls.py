from django.urls import path
from .views import stockActivityHandler, stockActivityDetail

urlpatterns = [
    path('stockactivity/',stockActivityHandler),
    path('stockactivity/<int:pk>',stockActivityDetail)
]