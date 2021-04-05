from django.shortcuts import render
from .models import debtClearance
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import DebtClearanceSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated


#create view for company clearance
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def debtClearancePerCompany(request,company,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)
    
    if request.method == "GET":
        clearance = debtClearance.objects.filter(companyId=company,date__range=[start_date, end_date])
        serializer = DebtClearanceSerializer(clearance,many=True)
        return Response(serializer.data)



#create view for company clearance
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def debtClearanceForCompany(request,company,branch,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)
    
    if request.method == "GET":
        clearance = debtClearance.objects.filter(companyId=company,branchId=branch,date__range=[start_date, end_date])
        serializer = DebtClearanceSerializer(clearance,many=True)
        return Response(serializer.data)



        
# create view for clearance here
@swagger_auto_schema(method='post',request_body=DebtClearanceSerializer)
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def debtClearanceHandler(request):


    if request.method == 'GET':
        clearance = debtClearance.objects.all()
        serializer = DebtClearanceSerializer(clearance,many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = DebtClearanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Create your views for single debt here.
@swagger_auto_schema(method='put',request_body=DebtClearanceSerializer)
@api_view(["GET","PUT","DELETE"])
@permission_classes([IsAuthenticated])
def debtClearanceDetail(request, pk):
    try:
        theDebt = debtClearance.objects.get(pk=pk)
    except debtClearance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DebtClearanceSerializer(theDebt)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = DebtClearanceSerializer(theDebt,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theDebt.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)