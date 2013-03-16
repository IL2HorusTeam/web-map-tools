from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello! This site is under development.")
