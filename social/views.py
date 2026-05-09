from django.shortcuts import render

def favorites(request):
    return render(request, 'social/favorites.html')

def trending(request):
    return render(request, 'social/trending.html')
