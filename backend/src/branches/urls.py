from django.urls import path
from .views import branchHandler, branchDetail, companyBranches,remoteBranch

urlpatterns = [
    path('branches/',branchHandler),
    path('branches/<str:company>/',companyBranches),
    path('branches/branch/<int:pk>/',branchDetail),
    path('branches/<str:company>/<str:branchId>/',remoteBranch),
]

