from django.urls import path
from .views import salesHandler, salesDetail

urlpatterns = [
    path('sales/',salesHandler),
    path('sales/<int:pk>',salesDetail)
]