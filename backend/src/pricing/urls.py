from django.urls import path
from .views import priceList, priceDetail

urlpatterns = [
    path('prices/',priceList),
    path('price/<int:pk>/',priceDetail)
]
