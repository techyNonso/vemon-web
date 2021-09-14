from django.urls import path
from .views import companyHandler, companyDetail,payment,access_verification

urlpatterns = [
    path('companies/',companyHandler),
    path('companies/<int:pk>/',companyDetail),
    path('companies/payment/<int:pk>/',payment),
    path('companies/<str:value>/',access_verification)
]

