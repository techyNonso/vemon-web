from django.urls import path
from .views import stockHandler, stockDetail

urlpatterns = [
    path('stock/',stockHandler),
    path('stock/<int:pk>',stockDetail)
]

