from rest_framework import serializers
from account.models import Account
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
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

"""
class EmailVerificationSerializer(serializers.ModelSerializer):
    token=serializers.CharField(max_length=555)

    class Meta:
        model=Account
        fields=['token']
"""