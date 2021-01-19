from django.urls import path, register_converter
from .views import debtClearanceHandler, debtClearanceForCompany, debtClearanceDetail,debtClearancePerCompany

from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('clearance/',debtClearanceHandler),
    path('clearance/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/', debtClearanceForCompany),
    path('clearance/company/<str:company>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/', debtClearancePerCompany),
    path('clearance/<int:pk>/', debtClearanceDetail)
]
