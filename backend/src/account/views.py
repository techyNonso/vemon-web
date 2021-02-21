from django.shortcuts import render
from .models import Account
from .serializers import RegistrationSerializer, LoginSerializer, SetNewPasswordSerializer,UserSerializer, LogoutSerializer,RequestPasswordResetEmailSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status,views,generics
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
from django.utils.encoding import smart_str, force_str, smart_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from decouple import config
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect


#we specify our own redirect class because django only allows redirect to http or https
class CustomRedirect(HttpResponsePermanentRedirect):
    #remember to add scheme for desktop app
    allowed_schemes = ['http','https']

# Create your views here.
@swagger_auto_schema(method='post',request_body=RegistrationSerializer)
@api_view(['POST',])
@permission_classes((AllowAny,))
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
            return Response(data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# Resend email validation link .
@api_view(['POST',])
@permission_classes((AllowAny,))
def resendValidationEmail(request):
    
    if request.method == "POST":
        email = request.data['email']
        if Account.objects.filter(email=email).exists() and not Account.objects.get(email=email).is_active:
            data = {}
            account = Account.objects.get(email=email)
            data["response"]="Mail sent successfully"
            data["email"]=account.email
            data["first_name"]=account.first_name
            data["last_name"]=account.last_name
            #token = Token.objects.get(user=account).key
            token=RefreshToken.for_user(account).access_token
            current_site = get_current_site(request).domain
            relativeLink=reverse('email-verify')
            absurl='http://'+current_site+relativeLink+'?token='+str(token)
            email_body="Hello "+account.first_name+" Use link below to verify your email \n"+absurl
            message={'email_body':email_body,'to_email':account.email,'email_subject':'Verify your email account'}
            Util.send_email(message)
            #data["token"] = token
            return Response(data)
        elif Account.objects.get(email=email).is_active:
            print('oops')
            return Response({'message':'This account has already been verified'},status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'message':'Invalid credential'},status=status.HTTP_400_BAD_REQUEST)



#@swagger_auto_schema(method='post',request_body=AttendanceSerializer)
# Create your views here.
@api_view(['POST',])

def contactMessage(request, ):
    
    
    
    if request.method == 'POST':
        data = request.data
        
        #'to' will take a value based on what department gets the mail
        # the email sending should be on try and except
        
        email_to = "williamikeji@gmail.com"
        email_body="From: "+data['fname']+" "+data['lname']+" "+"\n"+"Email: "+data['email']+"\n"+"Message: "+data['msg']+"\n"
        message={'email_body':email_body,'to_email':email_to,'email_subject':'Customer message'}
        #return message based on mail sending result
        if Util.send_email(message):
            return Response({'message':"Successfully sent"},status=status.HTTP_200_OK)
        else:
            return Response({'message':"Email not sent"},status=status.HTTP_502_BAD_GATEWAY)



token_param_config=openapi.Parameter('token',in_=openapi.IN_QUERY,description='Description',type=openapi.TYPE_STRING)
@swagger_auto_schema(method='get',manual_parameters=[token_param_config])
@api_view(["GET"])
def VerifyEmail(request):
    
    if request.method == "GET":
        token = request.GET.get('token')
        url = config('FRONTEND_URL')
        try:
            payload=jwt.decode(token,settings.SECRET_KEY)
            user = Account.objects.get(id=payload['user_id'])
            if not user.is_active:
                user.is_active=True
                user.save()
                #redirect to verify-email page reply on react
            return CustomRedirect(url+'/verify-email?verified=true&info=Email verified')
                
                #return Response({'email':"Successfully activated"},status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return CustomRedirect(url+'/verify-email?verified=false&info=The activation link has expired')
                
            #return Response({'error':"activation link expired"},status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return CustomRedirect(url+'/verify-email?verified=false&info=Invalid activation link')
            
            #return Response({'error':"invalid activation link"},status=status.HTTP_400_BAD_REQUEST)





#Create view for put , delete and detail

#swagger_auto_schema(method='post',request_body=RegistrationSerializer)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def userHandler(request,pk=None):
    try:
        myUser = Account.objects.get(id=request.user.id)
    except Account.DoesNotExist:
        return Response(data="no  such user exists",status=status.HTTP_404_NOT_FOUND)

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

#login modifier that returns user details
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


#logout view
class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

#password change
class RequestPasswordResetEmail(generics.GenericAPIView):
    
    serializer_class = RequestPasswordResetEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data['email']
       
        if Account.objects.filter(email=email).exists():
            user = Account.objects.get(email=email)
            
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink=reverse('password-reset-confirm',kwargs={'uidb64':uidb64,'token':token})
            absurl='http://'+current_site+relativeLink
            email_body="Hello, \n  Use link below to set a new password \n"+absurl
            message={'email_body':email_body,'to_email':user.email,'email_subject':'Password reset'}
            Util.send_email(message)
            return Response({'success':'A password reset link has been sent to the email you provided.'},status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invalid credential'},status=status.HTTP_400_BAD_REQUEST)
        

class PasswordTokenCheckAPI(generics.GenericAPIView):
    def get(self,request, uidb64,token):
        url = config('FRONTEND_URL')
        
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user=Account.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                return CustomRedirect(url+'/reset-password?verified=false&info=This token is not valid, please request for a new one')

            return CustomRedirect(url+'/reset-password?verified=true&info=Credentials valid&uidb64='+uidb64+'&token='+token)

        except DjangoUnicodeDecodeError as identifier:
            return CustomRedirect(url+'/reset-password?verified=false&info=Token is not valid, please request for a new one')
            


#setting the new password
class SetNewPasswordApiView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True,'message':'password reset successful. Proceed to login'}, status=status.HTTP_200_OK)