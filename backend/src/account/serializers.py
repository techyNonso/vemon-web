from rest_framework import serializers
from account.models import Account
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.utils.encoding import smart_str, force_str, smart_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


#serializers for account 
class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"},write_only=True)

    class Meta:
        model = Account
        fields = ["email","first_name","last_name","phone","password","password2"]
        extra_kwargs = {
            "password": {"write_only":True}
        }


    #over write the save function
    def save(self):
        account = Account(
            email=self.validated_data["email"],
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            phone=self.validated_data["phone"]
        )

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"password": "passwords must match"})
        account.set_password(password)
        account.save()
        return account


#login serializer
class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=serializers.CharField(max_length=68,min_length=6,write_only=True)
    tokens=serializers.CharField(max_length=68,min_length=6,read_only=True)
    
    class Meta:
        model=Account
        fields='__all__'
        extra_kwargs={
            'first_name':{'required': False},
            'last_name':{'required':False},
            'phone':{'required':False}
        }
        
    def validate(self, attrs):
        email=attrs.get('email','')
        password=attrs.get('password','')

        user=auth.authenticate(email=email,password=password)
       
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_emailvalidated:
            raise AuthenticationFailed('Email is not verified')
        
        
        return {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'tokens':user.tokens
        }
        return super().validate(attrs)



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
       # fields = ['staffId', 'staffName', 'arrivalTime','exitTime']
        fields = '__all__'
"""
class EmailVerificationSerializer(serializers.ModelSerializer):
    token=serializers.CharField(max_length=555)

    class Meta:
        model=Account
        fields=['token']
"""


# logout serializer
class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


    def validate(self, attrs):
        self.token = attrs['refresh']

        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad token')

#auth.tokens.PasswordResetTokenGenerator
#password change request serializer
class RequestPasswordResetEmailSerializer(serializers.Serializer):

    email = serializers.EmailField(min_length=2)

    class Meta:
        field = ['email']
    


class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(min_length=6,max_length=68,write_only=True)
    token=serializers.CharField(min_length=1,write_only=True)
    uidb64=serializers.CharField(min_length=1,write_only=True)
    password2 = serializers.CharField(style={"input_type": "password"},write_only=True)

    class Meta:
        fields=['password','token','uidb64']

    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
                raise serializers.ValidationError({"password2": "passwords do not match"})
            
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            user.set_password(password)
            user.save()
            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid, please generate another one', 401)
        return super().validate(attrs)