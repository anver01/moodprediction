from django import forms
from predictor.models import ImageUpload

class ImageForm(forms.ModelForm):
    class Meta():
        model = ImageUpload
        fields = ('img',)