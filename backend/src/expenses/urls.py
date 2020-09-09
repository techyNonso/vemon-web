from django.urls import path
from .views import expenseHandler, expenseDetail, companyExpense

urlpatterns=[
    path('expenses/',expenseHandler),
    path('expenses/company/<str:company>/<str:branch>/', companyExpense),
    path('expenses/<int:pk>/',expenseDetail)
]