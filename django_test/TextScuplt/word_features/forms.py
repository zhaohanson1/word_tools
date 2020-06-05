from django import forms

class DiffForm(forms.Form):
    text_1 = forms.CharField(label='Text 1', 
                            widget=forms.Textarea, 
                            required=False)
    text_2 = forms.CharField(label='Text 2', 
                            widget=forms.Textarea, 
                            required=False)
    ranges = forms.CharField(widget=forms.HiddenInput)
