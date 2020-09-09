from django.urls import path
from .views import stockActivityHandler, stockActivityDetail, companyStockActivity

urlpatterns = [
    path('stockactivity/',stockActivityHandler),
    path('stockactivity/company/<str:company>/<str:branch>/',companyStockActivity),
    path('stockactivity/<int:pk>/',stockActivityDetail)
]