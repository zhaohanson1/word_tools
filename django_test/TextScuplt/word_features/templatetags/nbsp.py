# templatetags/nbsp.py

from django import template
from django.utils.safestring import mark_safe
from django.utils.html import conditional_escape

register = template.Library()

@register.filter()
def nbsp(value):
    return mark_safe("&nbsp;".join(conditional_escape(value).split(' ')))