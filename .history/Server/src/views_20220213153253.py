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
    return list

class UserDetailView(APIView):
    def get_current_user(self, request, *args, **kwargs):
        uid = kwargs['user_id']
        curr_user = User.objects.get(id = uid)
        serialize_user = UserSerializer(curr_user)
        return Response(serialize_user.data)

class FolderDetailView(APIView):
    authenticated_classes = []

    def get(self, request, *args, **kwargs):
        fid = kwargs['folder_id']
        folder = Folder.objects.get(id = fid)
        list = all_parents(folder)
        print(list)
        serialize_folder = FolderSerializer(folder)
        serialize_parents = SubFolderSerializer(list, many=True)
        data_folder = serialize_folder.data
        data_folder['tree'] = serialize_parents.data

        return Response(data_folder)

    def delete(self,request, *args, **kwargs):
        folder_id = kwargs['folder_id']
        folder = Folder.objects.get(id = folder_id)
        folder.delete()
        return Response("Folder Deleted successfully")

class FileDetailView(APIView):
    def delete(self, request, *args, **kwargs):
        FID = kwargs['file_id']
        file = File.objects.get(id = FID)
        file.delete()
        return Response("File Deleted successfully")

@method_decorator(csrf_exempt, name="dispatch")
class CreateFolder(APIView):
    parser_classes = [FormParser, MultiPartParser]
    authenticated_classes = []

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        folder_id = kwargs['folder_id']
        print(request.data)
        name = request.data.get("name", "Untitled")
        parent = Folder.objects.get(id = folder_id)
        folder = Folder(name=name)