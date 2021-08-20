from django.shortcuts import render
from .models import attendance
from .serializers import AttendanceSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated

@swagger_auto_schema(method='post',request_body=AttendanceSerializer)
# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def companyAttendance(request, company,branch,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == 'GET':
        allAttendance = attendance.objects.filter(companyId=company,branchId=branch,date__range=[start_date, end_date])
        serializer = AttendanceSerializer(allAttendance, many=True)
        return Response(serializer.data)


@swagger_auto_schema(method='post',request_body=AttendanceSerializer)
# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def attendanceHandler(request):

    if request.method == 'GET':
        allAttendance = attendance.objects.all()
        serializer = AttendanceSerializer(allAttendance, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #create attendance or update existing attendance
        obj,create = attendance.objects.update_or_create(
            companyId=request.data.get('companyId'),
            branchId=request.data.get('branchId'),
            storageId=request.data.get('storageId'),
            defaults=request.data
        )
        return Response({"message": "done" }, status=status.HTTP_201_CREATED)
        

#Create view for put , delete and detail
@swagger_auto_schema(method='put',request_body=AttendanceSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
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