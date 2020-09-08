from django.urls import path
from .views import stockHandler, stockDetail, allStockHandler

urlpatterns = [
    path('stock/',allStockHandler),
    path('stock/<str:company>/<str:branch>',stockHandler),
    path('stock/<int:pk>',stockDetail)
]

