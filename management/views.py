from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from accounts.models import CustomUser
#from recipes.models import Recipe
from management.models import UserLog
from django.db.models import Count

# ========== DASHBOARD VIEW ==========

class AdminDashboardView(View):
    """Main admin dashboard with statistics"""
    
    def get(self, request):
        # Get statistics
        total_users = CustomUser.objects.count()
        total_recipes = 0
        active_users = CustomUser.objects.filter(is_active=True).count()
        staff_members = CustomUser.objects.filter(is_staff=True).count()
        
        # Get recent activity
        recent_activity = UserLog.objects.all().order_by('-timestamp')[:10]
        
        context = {
            'total_users': total_users,
            'total_recipes': total_recipes,
            'active_users': active_users,
            'staff_members': staff_members,
            'recent_activity': recent_activity,
        }
        return render(request, 'management/admin_dashboard_new.html', context)
  


# ========== USER MANAGEMENT VIEWS ==========

class ListUsersView(View):
    """List all users with search and filter"""
    
    def get(self, request):
        users = CustomUser.objects.all()
        
        # Search by email or name
        search = request.GET.get('search', '')
        if search:
            users = users.filter(email__icontains=search) | \
                    users.filter(first_name__icontains=search) | \
                    users.filter(last_name__icontains=search)
        
        # Filter by type
        user_type = request.GET.get('type', '')
        if user_type == 'staff':
            users = users.filter(is_staff=True)
        elif user_type == 'active':
            users = users.filter(is_active=True)
        elif user_type == 'inactive':
            users = users.filter(is_active=False)
        
        context = {
            'users': users,
            'search': search,
            'user_type': user_type,
        }
        return render(request, 'management/users.html', context)


class UserDetailView(View):
    """View detailed user information"""
    
    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        
        # Get user's activity
        user_activity = UserLog.objects.filter(user=user).order_by('-timestamp')[:20]
        
        context = {
            'user': user,
            'user_activity': user_activity,
        }
        return render(request, 'management/user_detail.html', context)


class ToggleStaffView(View):
    """Make user staff or remove staff privileges"""
    
    def post(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        user.is_staff = not user.is_staff
        user.save()
        
        # Log the action
        UserLog.objects.create(
            user=user,
            action='staff_status_changed',
            details=f'Staff status changed to: {user.is_staff}'
        )
        
        return redirect('user_detail', user_id=user_id)


class DeactivateUserView(View):
    """Deactivate/Activate user account"""
    
    def post(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        user.is_active = not user.is_active
        user.save()
        
        # Log the action
        UserLog.objects.create(
            user=user,
            action='account_deactivated' if not user.is_active else 'account_activated',
            details=f'Account is now: {"inactive" if not user.is_active else "active"}'
        )
        
        return redirect('user_detail', user_id=user_id)


class DeleteUserView(View):
    """Permanently delete user account"""
    
    def post(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        user.delete()
        
        return redirect('user_list')
