from django.urls import path
from .views import debtHandler, debtDetail, debtsForCompany

urlpatterns = [
    path('debts/',debtHandler),
    path('debts/company/<str:company>/<str:branch>/', debtsForCompany),
   path('debts/<int:pk>/', debtDetail)
]
