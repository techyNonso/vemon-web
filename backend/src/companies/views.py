from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import company
from .serializers import CompanySerializer
from account.models import Account


# Create your views here.
@api_view(['GET','POST'])
def companyHandler(request):
    if request.method == "GET":
        companies = company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #hard code user detail , letter do it with authentication
        account = Account.objects.get(pk=1)
        companyPost = company(owner=account)
        serializer = CompanySerializer(companyPost,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your company detail view
@api_view(['GET','PUT','DELETE'])
def companyDetail(request, pk):
    try:
        theCompany = company.objects.get(pk=pk)
    except company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = CompanySerializer(theCompany)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CompanySerializer(theCompany,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theCompany.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)