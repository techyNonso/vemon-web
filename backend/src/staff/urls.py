from django.urls import path
from .views import allStaffHandler, staffDetail

urlpatterns = [
    path('staff/',allStaffHandler),
    path('staff/<int:pk>',staffDetail)
]