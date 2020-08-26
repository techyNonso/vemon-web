from django.urls import path
from .views import branchHandler, branchDetail

urlpatterns = [
    path('branches/',branchHandler),
    path('branches/<int:pk>',branchDetail)
]

