"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from src import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('acs-api/users/<int:user_id>/', views.UserDetailView.as_view()),
    path('acs-api/folders/<int:folder_id>/', views.FolderDetailView.as_view()),
    path('acs-api/folders/<int:folder_id>/folders/', views.CreateFolder.as_view()),
    path('acs-api/folders/<int:folder_id>/files/', views.CreateFile.as_view()),
    path('acs-api/files/<int:file_id>/', views.FileDetailView.as_view()),
    path('acs-api/search/', views.Search.as_view()),
    path('acs-api/move/', views.MoveFolder.as_view()),
]
