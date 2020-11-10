from django.urls import path
from .views import branchHandler, branchDetail, companyBranches

urlpatterns = [
    path('branches/',branchHandler),
    path('branches/<str:company>/',companyBranches),
    path('branches/branch/<int:pk>/',branchDetail)
]

