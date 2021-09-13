from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import company
from .serializers import CompanySerializer
from account.models import Account
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from vemon.utils import Util
from account.models import Account

# Create your views here.

@swagger_auto_schema(method='post',request_body=CompanySerializer)
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def companyHandler(request):
    
    if request.method == "GET":
        companies = company.objects.filter(owner=request.user)
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #hard code user detail , letter do it with authentication
        
        companyPost = company(owner=request.user)
        serializer = CompanySerializer(companyPost,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your company detail view
@swagger_auto_schema(method='put',request_body=CompanySerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def companyDetail(request, pk):
    try:
        theCompany = company.objects.get(pk=pk)
    except company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if theCompany.owner != request.user:
        return Response({"details":"you do not have access to this company"})
    
    if request.method == "GET":
        serializer = CompanySerializer(theCompany)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CompanySerializer(theCompany,request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theCompany.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#send mail
def send_mail(company):
    if Account.objects.filter(email=company.owner).exists():
        account = Account.objects.get(email=company.owner)
        email_body = "Hello, "+account.first_name+" "+account.last_name +"\n\n You are getting this mail to confirm that your company activation was successful \n Company name: "+company.companyName+"\n"+"Company ID: "+company.companyId+"\n Plan: "+company.plan+"\n Expiry date: "+company.expiryDate.strftime("%d/%m/%y")+"\n If you have questions, please contact us."
        message={'email_body':email_body,'to_email':[account.email],'email_subject':'Payment confirmation'}
        Util.send_email(message)
        


#create your company detail view
@swagger_auto_schema(method='put',request_body=CompanySerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def payment(request, pk):
    try:
        theCompany = company.objects.get(pk=pk)
    except company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if theCompany.owner != request.user:
        return Response({"details":"you do not have access to this company"})
    
    if request.method == "GET":
        serializer = CompanySerializer(theCompany)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CompanySerializer(theCompany,request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            #send payment mail
            send_mail(theCompany)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theCompany.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)