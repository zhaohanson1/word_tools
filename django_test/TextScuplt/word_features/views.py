from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .forms import DiffForm
import json
import itertools

def index(request):
    return render(request, 'word_features/base.html')

def count(request):
    return render(request, 'word_features/count.html')

def replace(request):
    return render(request, 'word_features/replace.html')

def diff(request):
    if request.method == 'POST':
        return display(request)
    context = {
        'form': DiffForm()
    }
    return render(request, 'word_features/diff_input.html', context)

def display(request):
    form = DiffForm(request.POST)
    diff_ranges = json.loads(request.POST.get('ranges'))
    text_1_list = request.POST['text_1'].split('\n')
    text_2_list = request.POST['text_2'].split('\n')
    both_text = itertools.zip_longest(text_1_list, text_2_list, fillvalue="")

    added = set()
    for r in diff_ranges[0]:
        for i in range(r[0], r[1]+1):
            added.add(i)
    
    removed = set()
    for r in diff_ranges[1]:
        for i in range(r[0], r[1]+1):
            removed.add(i)
    
    context = {
        'text_1': text_1_list,
        'text_2': text_2_list,
        'both_text': both_text,
        'added': added,
        'removed': removed,
        'form': DiffForm()
    }
    
    return render(request, 'word_features/diff_display.html', context)