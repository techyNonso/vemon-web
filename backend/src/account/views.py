from django.shortcuts import render
from .models import Account
from .serializers import RegistrationSerializer, LoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# Create your views here.



@swagger_auto_schema(method='post',request_body=RegistrationSerializer)
@api_view(['POST',])
def registerUser(request):
    
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["response"]="registration successful"
            data["email"]=account.email
            data["first_name"]=account.first_name
            data["last_name"]=account.last_name
            data["phone"]=account.phone
            #token = Token.objects.get(user=account).key
            token=RefreshToken.for_user(account).access_token
            current_site = get_current_site(request).domain
            relativeLink=reverse('email-verify')
            absurl='http://'+current_site+relativeLink+'?token='+str(token)
            email_body="Hello "+account.first_name+" Use link below to verify your email \n"+absurl
            message={'email_body':email_body,'to_email':account.email,'email_subject':'Verify your email account'}
            Util.send_email(message)
            #data["token"] = token
        else:
            data=serializer.errors
        return Response(data)


token_param_config=openapi.Parameter('token',in_=openapi.IN_QUERY,description='Description',type=openapi.TYPE_STRING)
@swagger_auto_schema(method='get',manual_parameters=[token_param_config])
@api_view(["GET"])
def VerifyEmail(request):
    
    if request.method == "GET":
        token = request.GET.get('token')
        try:
            payload=jwt.decode(token,settings.SECRET_KEY)
            user = Account.objects.get(id=payload['user_id'])
            if not user.is_active:
                user.is_active=True
                user.save()
            return Response({'email':"Successfully activated"},status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error':"activation link expired"},status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error':"invalid activation link"},status=status.HTTP_400_BAD_REQUEST)


"""
@swagger_auto_schema(method='post',request_body=LoginSerializer)
#login view
@api_view(['POST'])
def LoginView(request):
    if request.method == "POST":
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
"""