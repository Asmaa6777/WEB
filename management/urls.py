from django.urls import path
from . import views

urlpatterns = [
    # Dashboard URLs
    path('dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),

    # User Management URLs
    path('users/', views.ListUsersView.as_view(), name='user_list'),
    path('users/<int:user_id>/', views.UserDetailView.as_view(), name='user_detail'),
    path('users/<int:user_id>/toggle-staff/', views.ToggleStaffView.as_view(), name='toggle_staff'),
    path('users/<int:user_id>/deactivate/', views.DeactivateUserView.as_view(), name='deactivate_user'),
    path('users/<int:user_id>/delete/', views.DeleteUserView.as_view(), name='delete_user'),

    # Recipe Management URLs
    path('recipes/', views.ListRecipesView.as_view(), name='recipe_manage'),
    path('recipes/new/', views.CreateRecipeView.as_view(), name='recipe_create'),
    path('recipes/<int:pk>/edit/', views.EditRecipeView.as_view(), name='recipe_edit'),
    path('recipes/<int:pk>/delete/', views.DeleteRecipeView.as_view(), name='recipe_delete'),
]