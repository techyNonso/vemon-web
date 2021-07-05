from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import branch
from .serializers import BranchesSerializer
from account.models import Account
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated

#get branches based on company id
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def companyBranches(request,company):
    if request.method == "GET":
        branches = branch.objects.filter(companyId=company)
        serializer = BranchesSerializer(branches, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #hard code user detail , letter do it with authentication
        account = request.user
        branchPost = branch(owner=account)
        serializer = BranchesSerializer(branchPost,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#get branches based on company id for local app processing
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def remoteBranch(request,company,branchId):
    if request.method == "GET":
        branches = branch.objects.filter(companyId=company,branchId=branchId)
        serializer = BranchesSerializer(branches, many=True)
        return Response(serializer.data)
    

@swagger_auto_schema(method='post',request_body=BranchesSerializer)
# Create your views here.
@api_view(['GET','POST'])
def branchHandler(request):
    if request.method == "GET":
        branches = branch.objects.all()
        serializer = BranchesSerializer(branches, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #hard code user detail , letter do it with authentication
        account = request.user
        branchPost = branch(owner=account)
        serializer = BranchesSerializer(branchPost,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your company detail view
@swagger_auto_schema(method='put',request_body=BranchesSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def branchDetail(request, pk):
    try:
        theBranch = branch.objects.get(pk=pk)
    except branch.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = BranchesSerializer(theBranch)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BranchesSerializer(theBranch,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theBranch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)