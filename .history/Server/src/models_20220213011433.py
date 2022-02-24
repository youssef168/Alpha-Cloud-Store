from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=55)
    home = models.OneToOneField('Folder', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class File(models.Model):
    name = models.CharField(max_length=100)
    size = models.IntegerField()
    extension = models.CharField(max_length=12)
    link = models.CharField(max_length=70)
    document = models.FileField(upload_to="files", null=True)
    doc_name = models.CharField(max_length=100, null=True, blank=True)
    parent = models.ForeignKey("Folder", on_delete=models.CASCADE, related_name="Documents")
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Folder(models.Model):
    name = models.CharField(max_length=100)
    folder = models.ManyToManyField('self', related_name="parents", symmetrical=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    parent = models.OneToOneField('self', related_name="folder", on_delete=models.CASCADE)