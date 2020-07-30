# templatetags/nbsp.py

from django import template
from django.utils.safestring import mark_safe
from django.utils.html import conditional_escape

register = template.Library()

@register.filter()
def nbsp(value):
    """
    Used in diff_display, otherwise whitespaces will not be rendered.
    """
    return mark_safe("&nbsp;".join(conditional_escape(value).split(' ')))