from django.urls import path
from . import views

urlpatterns = [
    # Recipe Management URLs
    path('', views.ListRecipesView.as_view(), name='recipe_list'),  # /management/recipes/
    path('new/', views.CreateRecipeView.as_view(), name='recipe_create'),  # /management/recipes/new/
    path('<int:recipe_id>/edit/', views.EditRecipeView.as_view(), name='recipe_edit'),  # /management/recipes/1/edit/
    path('<int:recipe_id>/delete/', views.DeleteRecipeView.as_view(), name='recipe_delete'),  # /management/recipes/1/delete/
]