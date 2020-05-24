from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .forms import DiffForm

def index(request):
    context = {}
    return render(request, 'word_features/word_template.html', context)

def count(request):
    return render(request, 'word_features/word_count.html')

def replace(request):
    return render(request, 'word_features/word_replace.html')

def diff(request):
    if request.method == 'POST':
        form = DiffForm(request.POST)
        if form.is_valid():
            a = form.get('text_1')
            b = form.get('text_2')
            return render(request, 'word_features/diff_display.html')
    return render(request, 'word_features/diff_input.html')