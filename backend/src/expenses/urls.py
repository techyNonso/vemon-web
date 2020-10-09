from django.urls import path, register_converter
from .views import expenseHandler, expenseDetail, companyExpense
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns=[
    path('expenses/',expenseHandler),
    path('expenses/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/', companyExpense),
    path('expenses/<int:pk>/',expenseDetail)
]