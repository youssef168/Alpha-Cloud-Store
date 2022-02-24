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
        folder.save()
        parent.folder.add(folder)
        serialize_folder = FolderSerializer(folder)
        return Response(serialize_folder.data)

class CreateFile(APIView):
    parser_classes = [FormParser, MultiPartParser]
    authenticated_classes = []

    def post(self, request, *args, **kwargs):
        folder_id = kwargs['folder_id']
        name = request.data['name']
        doc = request.FILES.get('file')
        ext = doc.name.split('.')[1]
        size = doc.size
        print(doc.name)
        print(doc.size)
        parent = Folder.objects.get(id = folder_id)
        file = Folder(name=name, document=doc, size=size, extension=ext, doc_name=doc.name)
        file.parent = parent
        file.save()
        parent.files.add(file)
        serialized = FileSerializer(file)
        return Response(serialized.data)

class MoveFolder(APIView):
    def move(self, request, *args, **kwargs):
        from_folder = request.data.get('fromFolder')
        to_folder = request.data.get('toFolder')
        move_type = request.data.get('type')
        id = request.data.get('id')
        old_parent = Folder.objects.get(id= from_folder)
        new_parent = Folder.objects.get(id= to_folder)
        final_items = {}
        if move_type == 'folder':
            item = Folder.objects.get(id=id)
            old_parent.folders.remove(item)
            new_parent.folders.add(item)
            final_items = FolderSerializer(item).data

        else:
            item = File.objects.get(id=id)
            item.parent = new_parent
            item.save()
            final_items = FileSerializer(item).data

        old_item = FolderSerializer(old_parent).data
        new_item = FolderSerializer(new_parent).data

        return Response({ "from": old_item, "to": new_item, "item": final_items})


class Search(APIView):
    def search(self, request, *args, **kwargs):
        params = request.GET
        search_type = params.get('type')
        search_query = params.get('query')
        folders = []
        files = []

        if search_type == 'folder':
            folder_raw = Folder.objects.filter(name_icontains=search_query)
            folder_src = SubFolderSerializer(folder_raw, many=True)
            folders = folder_src.data
