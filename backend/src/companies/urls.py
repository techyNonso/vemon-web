from django.urls import path
from .views import companyHandler, companyDetail,payment

urlpatterns = [
    path('companies/',companyHandler),
    path('companies/<int:pk>/',companyDetail),
    path('companies/payment/<int:pk>/',payment)
]

