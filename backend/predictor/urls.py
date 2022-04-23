from django.urls import path
from predictor import views

app_name = 'predictor'

urlpatterns = [
    path('', views.index, name='index'),
    path('result/', views.result, name='result')
    path('api/', name='api')
]
