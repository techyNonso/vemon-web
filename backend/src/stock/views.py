from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import stock
from .serializers import StockSerializer

#view for all stock
@api_view(['GET','POST'])
def allStockHandler(request):
    if request.method == "GET":
        allStock = stock.objects.all()
        serializer = StockSerializer(allStock,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StockSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
@api_view(['GET','POST'])
def stockHandler(request,company,branch):
    if request.method == "GET":
        allStock = stock.objects.filter(companyId=company,branchId=branch)
        serializer = StockSerializer(allStock, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StockSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your stock detail view
@api_view(['GET','PUT','DELETE'])
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