from django.db import models
from accounts.models import CustomUser

class AdminDashboard(models.Model):
    """Dashboard stats and info"""
    admin_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_users_viewed = models.IntegerField(default=0)
    last_accessed = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Dashboard - {self.admin_user.email}"


class UserLog(models.Model):
    """Track user activity"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.action}"