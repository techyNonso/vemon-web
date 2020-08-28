from django.urls import path
from .views import stockHandler, stockDetail

urlpatterns = [
    path('stock/<str:company>/<str:branch>',stockHandler),
    path('stock/<int:pk>',stockDetail)
]

