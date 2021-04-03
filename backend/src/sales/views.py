from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import sale
from .serializers import SalesSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated



# create view for per company 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MyCompanySales(request,company,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == "GET":
        sales = sale.objects.filter(companyId=company,date__range=[start_date, end_date])
        serializer = SalesSerializer(sales,many=True)
        return Response(serializer.data)


# create view for per company 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def companySales(request,company,branch,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == "GET":
        sales = sale.objects.filter(companyId=company,branchId=branch,date__range=[start_date, end_date])
        serializer = SalesSerializer(sales,many=True)
        return Response(serializer.data)

# Create your views here.
@swagger_auto_schema(method='post',request_body=SalesSerializer)
@api_view(['GET','POST'])
def salesHandler(request):
    if request.method == "GET":
        sales = sale.objects.all()
        serializer = SalesSerializer(sales, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #create sales or update existing sales
        obj,create = sale.objects.update_or_create(
            companyId=request.data.get('companyId'),
            branchId=request.data.get('branchId'),
            invoiceId=request.data.get('invoiceId'),
            productId=request.data.get('productId'),
            defaults=request.data
        )
        return Response({"message": "done" }, status=status.HTTP_201_CREATED)
        

#create your sale detail view
@swagger_auto_schema(method='put',request_body=SalesSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def salesDetail(request, pk):
    try:
        theSale = sale.objects.get(pk=pk)
    except sale.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = SalesSerializer(theSale)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SalesSerializer(theSale,request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':

        theSale.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)