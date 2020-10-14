from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import company
from .serializers import CompanySerializer
from account.models import Account
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated


# Create your views here.

@permission_classes((IsAuthenticated,))
@swagger_auto_schema(method='post',request_body=CompanySerializer)
@api_view(['GET','POST'])
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
@permission_classes((IsAuthenticated,))
@swagger_auto_schema(method='put',request_body=CompanySerializer)
@api_view(['GET','PUT','DELETE'])
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