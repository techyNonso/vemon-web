from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
#from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
# Create your models here.

phoneRegex = '\w{11}'


#custom user manager
class MyAccountManager(BaseUserManager):
    def create_user(self, email,first_name, last_name, phone, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must have a firstname")
        if not last_name:
            raise ValueError("Users must have a lastname")
        if not phone:
            raise ValueError("Users must have a phone number")

        user = self.model(
            email=self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            phone = phone,
            
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    #create super user
    def create_superuser(self, email,first_name,last_name,  phone,password):
        user = self.create_user(email,first_name , last_name,phone ,  password=password )

        user.is_admin =  True
        user.is_staff =  True
        user.is_superuser =  True
        user.is_emailvalidated = True
        user.is_phonevalidated = True
        user.save(using=self._db)
        return user


# custom user class
class Account(AbstractBaseUser):
    email             = models.EmailField(verbose_name="email", max_length=60, unique=True)
    first_name         = models.CharField(max_length=50)
    last_name          = models.CharField(max_length=50)
    phone             = models.CharField(max_length=11, validators=[
        RegexValidator(regex = phoneRegex, message='Phone number must be valid eleven digits', code='invalid_phone_number')
    ])
    date_joined       = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login        = models.DateTimeField(verbose_name="last login", auto_now_add=True)
    is_admin          = models.BooleanField(default=False)
    is_active         = models.BooleanField(default=True)
    is_staff          = models.BooleanField(default=False)
    is_superuser      = models.BooleanField(default=False)
    is_emailvalidated = models.BooleanField(default=False)
    is_phonevalidated = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS  =['first_name','last_name','phone']
    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
    
    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return {
            'refresh':str(refresh),
            'access': str(refresh.access_token)
        }

""" 
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
"""