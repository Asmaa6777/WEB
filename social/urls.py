from django.urls import path
from . import views

urlpatterns = [
    path('favorites/', views.favorites, name='favorites'),
    path('trending/', views.trending, name='trending'),
    path('favorite/toggle/<int:recipe_id>/', views.toggle_favorite, name='toggle_favorite'),
]
