from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
    context = {}
    return render(request, 'word_features/word_template.html', context)

def count(request):
    return render(request, 'word_features/word_count.html')

def replace(request):
    return render(request, 'word_features/word_replace.html')