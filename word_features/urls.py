from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('count', views.count, name='count'),
    path('replace', views.replace, name='replace'),
    path('diff', views.diff, name='diff'),
]
