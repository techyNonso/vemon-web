from django.urls import path, register_converter
from .views import attendanceHandler, attendanceDetail, companyAttendance
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('attendance/',attendanceHandler),
    path('attendance/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/',companyAttendance),
    path('attendance/<int:pk>/',attendanceDetail)
]
