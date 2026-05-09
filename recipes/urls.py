from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('recipes/', views.recipes_list, name='recipes_list'),
    path('recipes/<slug:category_slug>/', views.recipes_list, name='recipes_by_category'),
    path('recipe/<int:pk>/', views.recipe_detail, name='recipe_detail'),
    path('search/', views.search_results, name='search_results'),
]
