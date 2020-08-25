from django.urls import path
from .views import debtHandler, debtDetail

urlpatterns = [
    path('debts/',debtHandler),
   path('debts/<int:pk>', debtDetail)
]
