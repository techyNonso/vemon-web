from django.shortcuts import render
from .models import attendance
from .serializers import AttendanceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
        return Response(serializer.errors,status=status.HTTP_404_BAD_REQUEST)


#Create view for put , delete and detail

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
        serializer = AttendanceSerializer(myAttendance,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_BAD_REQUEST)
    elif request.method == 'DELETE':
        myAttendance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)