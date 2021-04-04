from django.urls import path, register_converter
from .views import invoicesHandler, invoiceDetail, companyInvoices, MyCompanyInvoices
from . import converters

register_converter(converters.FourDigitYearConverter, 'yyyy')
register_converter(converters.TwoDigitOthersConverter, 'nn')

urlpatterns = [
    path('invoices/',invoicesHandler),
    path('invoices/company/<str:company>/<str:branch>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/',companyInvoices),
    path('invoices/company/<str:company>/<yyyy:startyear>/<nn:startmonth>/<nn:startday>/<yyyy:endyear>/<nn:endmonth>/<nn:endday>/',MyCompanyInvoices),
    path('invoices/<int:pk>/',invoiceDetail)
]