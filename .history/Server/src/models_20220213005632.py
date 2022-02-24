from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=55)
    home = models.OneToOneField('Folder', on_delete=models.CASCADE)