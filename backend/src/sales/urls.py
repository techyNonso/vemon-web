from django.urls import path, register_converter
from .views import salesHandler, salesDetail, companySales
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('sales/',salesHandler),
    path('sales/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/',companySales),
    path('sales/<int:pk>/',salesDetail)
]