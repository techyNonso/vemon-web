from django.urls import path
from .views import expenseHandler, expenseDetail

urlpatterns=[
    path('expenses/',expenseHandler),
    path('expenses/<int:pk>',expenseDetail)
]