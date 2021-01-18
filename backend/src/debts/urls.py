from django.urls import path, register_converter
from .views import debtHandler, debtDetail, debtsForCompany
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('debts/',debtHandler),
    path('debts/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/', debtsForCompany),
    path('debts/<int:pk>/', debtDetail)
]
