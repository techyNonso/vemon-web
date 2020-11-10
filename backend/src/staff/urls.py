from django.urls import path
from .views import allStaffHandler, staffDetail, companyStaff

urlpatterns = [
    path('staff/',allStaffHandler),
    path('staff/company/<str:company>/<str:branch>/',companyStaff),
    path('staff/<int:pk>/',staffDetail)
]