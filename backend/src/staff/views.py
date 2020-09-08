from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import staff
from .serializers import StaffSerializer



# Create your views here.
@api_view(['GET','POST'])
def allStaffHandler(request):
    if request.method == "GET":
        allStaff = staff.objects.all()
        serializer = StaffSerializer(allStaff, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StaffSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your staff detail view
@api_view(['GET','PUT','DELETE'])
def staffDetail(request, pk):
    try:
        theStaff = staff.objects.get(pk=pk)
    except staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = StaffSerializer(theStaff)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StaffSerializer(theStaff,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theStaff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)