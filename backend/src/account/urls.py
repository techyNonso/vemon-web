from django.urls import path
from .views import registerUser, VerifyEmail,MyTokenObtainPairView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/',registerUser),
    path('login/',MyTokenObtainPairView.as_view(),name="login"),
    path('email-verify/',VerifyEmail,name="email-verify"),
]
