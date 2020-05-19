from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
    context = {
        'foo': 'bar',
        'test': [1,2,3,4]
    }
    return render(request, 'word_features/index.html', context)

def count(request):
    return render(request, 'word_features/word_count.html')