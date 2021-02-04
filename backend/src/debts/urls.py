from django.urls import path, register_converter
from .views import debtHandler, debtDetail, debtsForCompany,debtsPerCompany
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('debts/',debtHandler),
    path('debts/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/', debtsForCompany),
    path('debts/company/<str:company>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/', debtsPerCompany),
    path('debts/<int:pk>/', debtDetail)
]
