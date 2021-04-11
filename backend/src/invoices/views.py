from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import invoice
from .serializers import InvoiceSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated


# create view for per company 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MyCompanyInvoices(request,company,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == "GET":
        invoices = invoice.objects.filter(companyId=company,date__range=[start_date, end_date])
        serializer = InvoiceSerializer(invoices,many=True)
        return Response(serializer.data)


# create view for per company , filter credit invoices
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MyCompanyCreditInvoices(request,company,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == "GET":
        invoices = invoice.objects.filter(companyId=company,transactionType="credit",date__range=[start_date, end_date])
        serializer = InvoiceSerializer(invoices,many=True)
        return Response(serializer.data)

# create view for per company and branch
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def companyInvoices(request,company,branch,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == "GET":
        invoices = invoice.objects.filter(companyId=company,branchId=branch,date__range=[start_date, end_date])
        serializer = InvoiceSerializer(invoices,many=True)
        return Response(serializer.data)


# create view for per company and branch
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def companyCreditInvoices(request,company,branch,startyear,startmonth,startday,endyear,endmonth,endday):
    start_date = "%d-%d-%d"%(startyear,startmonth,startday)
    end_date = "%d-%d-%d"%(endyear,endmonth,endday)

    if request.method == "GET":
        invoices = invoice.objects.filter(companyId=company,branchId=branch,transactionType="credit",date__range=[start_date, end_date])
        serializer = InvoiceSerializer(invoices,many=True)
        return Response(serializer.data)



# Create your views here.
@swagger_auto_schema(method='post',request_body=InvoiceSerializer)
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def invoicesHandler(request):
    
    if request.method == "GET":
        invoices = invoice.objects.all()
        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        
        #create invoices or update existing invoices
        obj,create = invoice.objects.update_or_create(
            companyId=request.data.get('companyId'),
            branchId=request.data.get('branchId'),
            invoiceId=request.data.get('invoiceId'),
            defaults=request.data
        )
        return Response({"message": "done" }, status=status.HTTP_201_CREATED)
        

#create your invoice detail view
@swagger_auto_schema(method='put',request_body=InvoiceSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def invoiceDetail(request, pk):
    try:
        theInvoice = invoice.objects.get(pk=pk)
    except invoice.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = InvoiceSerializer(theInvoice)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = InvoiceSerializer(theInvoice,request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':

        theInvoice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)