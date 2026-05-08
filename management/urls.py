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
]