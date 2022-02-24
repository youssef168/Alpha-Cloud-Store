from django.shortcuts import render

from .models import File, Folder, User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from .serializer import UserSerializer, FileSerializer, FolderSerializer, SubFolderSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.

def all_parents(folder):
    list = [folder]
    parent = folder.parent
    print(parent.count())
    while parent.count() != 0:
        temp = parent.all()[0]
        list.insert(0, temp)
        parent = temp.parent