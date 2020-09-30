from django.shortcuts import render
from .models import attendance
from .serializers import AttendanceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(method='post',request_body=AttendanceSerializer)
# Create your views here.
@api_view(['GET','POST'])
def companyAttendance(request, company,branch):

    if request.method == 'GET':
        allAttendance = attendance.objects.filter(companyId=company,branchId=branch)
        serializer = AttendanceSerializer(allAttendance, many=True)
        return Response(serializer.data)


@swagger_auto_schema(method='post',request_body=AttendanceSerializer)
# Create your views here.
@api_view(['GET','POST'])
def attendanceHandler(request):

    if request.method == 'GET':
        allAttendance = attendance.objects.all()
        serializer = AttendanceSerializer(allAttendance, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AttendanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


#Create view for put , delete and detail
@swagger_auto_schema(method='put',request_body=AttendanceSerializer)
@api_view(['GET','PUT','DELETE'])
def attendanceDetail(request,pk):
    try:
        myAttendance = attendance.objects.get(pk=pk)
    except attendance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AttendanceSerializer(myAttendance)
        return  Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AttendanceSerializer(myAttendance,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        myAttendance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)