from django.contrib import admin
from django.urls import path
from .views import index
from django.urls import include

app_name = 'frontend'

urlpatterns = [
    path('', index, name='home'),
    path('join', index),
    path('create', index),
    path('', include('django.contrib.auth.urls')),
    path('room/<str:roomCode>', index),
]
