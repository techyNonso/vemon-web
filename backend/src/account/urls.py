from django.urls import path
from .views import registerUser,LogoutAPIView, VerifyEmail,MyTokenObtainPairView, userHandler,contactMessage
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/',registerUser),
    path('login/',MyTokenObtainPairView.as_view(),name="login"),
    path('logout/',LogoutAPIView.as_view(),name="logout"),
    path('email-verify/',VerifyEmail,name="email-verify"),
    path('user-update/',userHandler,name="user-update"),
    path('contact-us/',contactMessage)
]
