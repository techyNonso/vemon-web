from django.urls import path
from .views import registerUser,LogoutAPIView,SetNewPasswordApiView, VerifyEmail,RequestPasswordResetEmail,MyTokenObtainPairView, userHandler,contactMessage,PasswordTokenCheckAPI
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/',registerUser),
    path('login/',MyTokenObtainPairView.as_view(),name="login"),
    path('logout/',LogoutAPIView.as_view(),name="logout"),
    path('email-verify/',VerifyEmail,name="email-verify"),
    path('user-update/',userHandler,name="user-update"),
    path('contact-us/',contactMessage),
    path('request-reset-email', RequestPasswordResetEmail.as_view(),name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/',PasswordTokenCheckAPI.as_view(),name='password-reset-confirm'),
    path('password-reset-complete',SetNewPasswordApiView.as_view(),name='password-reset-complete')
]
