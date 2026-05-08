from django.contrib import admin
from .models import AdminDashboard, UserLog

@admin.register(AdminDashboard)
class AdminDashboardAdmin(admin.ModelAdmin):
    list_display = ('admin_user', 'total_users_viewed', 'last_accessed')
    
@admin.register(UserLog)
class UserLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('user__email',)