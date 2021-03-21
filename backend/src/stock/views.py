from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import stock
from .serializers import StockSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated

#view for all stock
@swagger_auto_schema(method='post',request_body=StockSerializer)
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def allStockHandler(request):
    if request.method == "GET":
        allStock = stock.objects.all()
        serializer = StockSerializer(allStock,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
       
        obj,create = stock.objects.update_or_create(
            batchId=request.data.get('batchId'),
            productId=request.data.get('productId'),
            defaults=request.data
        )
        
        return Response({"message":"done"}, status=status.HTTP_201_CREATED)

# Create your views here.
@swagger_auto_schema(method='post',request_body=StockSerializer)
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def stockHandler(request,company,branch):
    if request.method == "GET":
        allStock = stock.objects.filter(companyId=company,branchId=branch)
        serializer = StockSerializer(allStock, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #create stock or update existing stock
        obj,create = stock.objects.update_or_create(
            company=company,
            branchId=branch,
            batchId=request.data.get('batchId'),
            productId=request.data.get('productId'),
            defaults=request.data
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

#create your stock detail view
@swagger_auto_schema(method='put',request_body=StockSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def stockDetail(request, pk):
    try:
        theStock = stock.objects.get(pk=pk)
    except staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = StockSerializer(theStock)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StockSerializer(theStock,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theStock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)