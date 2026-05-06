from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('recipes/', views.recipes_list, name='recipes_list'),
    path('trending/', views.trending, name='trending'),
    path('favorites/', views.favorites, name='favorites'),
    path('profile/', views.profile, name='profile'),
    path('recipe-detail/', views.recipe_detail, name='recipe_detail'),
    path('search/', views.search_results, name='search_results'),
    
    # Admin paths
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/recipes/', views.admin_recipes, name='admin_recipes'),
    path('admin/add-recipe/', views.add_recipe, name='add_recipe'),
    path('admin/edit-recipe/', views.edit_recipe, name='edit_recipe'),
    path('admin/delete-recipe/', views.delete_recipe, name='delete_recipe'),
    path('admin/profile/', views.admin_profile, name='admin_profile'),
]
