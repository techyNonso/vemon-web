from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import stockActivity
from .serializers import StockActivitySerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated




# Create your views here.

@swagger_auto_schema(method='post',request_body=StockActivitySerializer)
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def stockActivityHandler(request):
    if request.method == "GET":
        allActivity = stockActivity.objects.all()
        serializer = StockActivitySerializer(allActivity, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StockActivitySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create view for particular company and branch view
@api_view(['GET',"POST"])
@permission_classes((IsAuthenticated,))
def companyStockActivity(request,company,branch,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)
    
    if request.method == "GET":
        allActivity = stockActivity.objects.filter(companyId=company,branchId=branch,date__range=[start_date, end_date])
        serializer = StockActivitySerializer(allActivity,many=True)
        return Response(serializer.data)
       

#create your staff detail view

@swagger_auto_schema(method='put',request_body=StockActivitySerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated,))
def stockActivityDetail(request, pk):
    try:
        theActivity = stockActivity.objects.get(pk=pk)
    except staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = StockActivitySerializer(theActivity)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StockActivitySerializer(theActivity,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theActivity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)