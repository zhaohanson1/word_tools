from ..models import ToolMetadata

def tool_metadata(request):
    return {'all_tools' : ToolMetadata.objects.all()}