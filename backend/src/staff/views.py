from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import staff
from .serializers import StaffSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated 


#create view for staff per company
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def companyStaff(request,company,branch):
    if request.method == "GET":
        allStaff = staff.objects.filter(companyId=company,branchId=branch)
        serializer = StaffSerializer(allStaff,many=True)
        return Response(serializer.data)


# Create your views here.
@swagger_auto_schema(method='post',request_body=StaffSerializer)
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def allStaffHandler(request):
    if request.method == "GET":
        allStaff = staff.objects.all()
        serializer = StaffSerializer(allStaff, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #create staff or update existing staff
        obj,create = staff.objects.update_or_create(
            companyId=request.data.get('companyId'),
            branchId=request.data.get('branchId'),
            email=request.data.get('email'),
            defaults=request.data
        )
        return Response({"message": "done" }, status=status.HTTP_201_CREATED)
        


#create your staff detail view
@swagger_auto_schema(method='put',request_body=StaffSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def staffDetail(request, pk):
    try:
        theStaff = staff.objects.get(pk=pk)
    except staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = StaffSerializer(theStaff)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StaffSerializer(theStaff,request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theStaff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)