from django.db import models
from django.urls import reverse

# Create your models here.

class ImageUpload(models.Model):

    img = models.ImageField(upload_to='face_images', verbose_name='Image')
