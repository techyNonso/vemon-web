from django.urls import path, register_converter
from .views import stockActivityHandler, stockActivityDetail, companyStockActivity
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('stockactivity/',stockActivityHandler),
    path('stockactivity/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/',companyStockActivity),
    path('stockactivity/<int:pk>/',stockActivityDetail)
]
