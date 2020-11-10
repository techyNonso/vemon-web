from django.urls import path
from .views import companyHandler, companyDetail

urlpatterns = [
    path('companies/',companyHandler),
    path('companies/<int:pk>/',companyDetail)
]

