from django import forms

class DiffForm(forms.Form):
    text_1 = forms.CharField(label='Text 1')
    text_2 = forms.CharField(label='Text 2')
    ranges = forms.CharField()
