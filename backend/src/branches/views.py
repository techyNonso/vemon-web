from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import branch
from .serializers import BranchesSerializer
from account.models import Account


#get branches based on company id
@api_view(["GET"])
def companyBranches(request,company):
    if request.method == "GET":
        branches = branch.objects.filter(companyId=company)
        serializer = BranchesSerializer(branches, many=True)
        return Response(serializer.data)


# Create your views here.
@api_view(['GET','POST'])
def branchHandler(request):
    if request.method == "GET":
        branches = branch.objects.all()
        serializer = BranchesSerializer(branches, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        #hard code user detail , letter do it with authentication
        account = Account.objects.get(pk=1)
        branchPost = branch(owner=account)
        serializer = BranchesSerializer(branchPost,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your company detail view
@api_view(['GET','PUT','DELETE'])
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