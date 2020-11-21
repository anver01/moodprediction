from django.shortcuts import render
from predictor.forms import ImageForm
from predictor.models import ImageUpload
from django.urls import reverse
from django.http import HttpResponseRedirect
from myscript import Converter
from django.conf import settings
from django.forms import modelformset_factory

# Create your views here.

result_dict = {}

def index(request):

    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)

        if form.is_valid():
            image = form.save(commit=False)

            if 'img' in request.FILES:
                image.img = request.FILES['img']

                image.save()
                result_dict['filename'] = request.FILES['img'].name
                return HttpResponseRedirect(reverse('predictor:result'))
        else:
            print(form.errors)
    else:
        form = ImageForm()

    return render(request, 'predictor/index.html', {'form':form})


def result(request):
    result_dict['image'] = ImageUpload.objects.last()

    result_dict['result'] = Converter('.' + settings.MEDIA_URL + 'face_images/' + result_dict['filename']).convert()

    return render(request, 'predictor/result.html', context=result_dict)