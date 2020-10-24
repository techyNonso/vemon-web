from django.shortcuts import render
from .models import Account
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
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
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.



@swagger_auto_schema(method='post',request_body=RegistrationSerializer)
@permission_classes((AllowAny,))
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





#Create view for put , delete and detail

#swagger_auto_schema(method='post',request_body=RegistrationSerializer)
@permission_classes((IsAuthenticated,))
@api_view(['PUT'])
def userHandler(request,pk=None):
    try:
        myUser = Account.objects.get(email=request.user)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UserSerializer(myUser,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['expirationLimit'] = user.expiration_limit
        token['stockLimit'] = user.stock_limit

        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer