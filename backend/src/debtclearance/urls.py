from django.urls import path
from .views import debtClearanceHandler, debtClearanceForCompany, debtClearanceDetail

urlpatterns = [
    path('clearance/',debtClearanceHandler),
    path('clearance/company/<str:company>/<str:branch>/', debtClearanceForCompany),
   path('clearance/<int:pk>/', debtClearanceDetail)
]
