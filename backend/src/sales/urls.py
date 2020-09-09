from django.urls import path
from .views import salesHandler, salesDetail, companySales

urlpatterns = [
    path('sales/',salesHandler),
    path('sales/company/<str:company>/<str:branch>/',companySales),
    path('sales/<int:pk>/',salesDetail)
]