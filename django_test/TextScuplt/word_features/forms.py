from django import forms

class DiffForm(forms.Form):
    textarea_attr = {
        'rows': 8,
        'autocomplete': 'off',
        'wrap': 'off'
        }
        
    text_1 = forms.CharField(label='Text 1', 
                            widget=forms.Textarea(attrs=textarea_attr),
                            required=False)
    text_2 = forms.CharField(label='Text 2', 
                            widget=forms.Textarea(attrs=textarea_attr),
                            required=False)
    ranges = forms.CharField(widget=forms.HiddenInput)
