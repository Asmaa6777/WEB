from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from django.http import JsonResponse, HttpResponseForbidden
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from accounts.models import CustomUser
from management.models import UserLog
from recipes.models import Recipe, Category
from recipes.forms import RecipeForm


class StaffRequiredMixin(LoginRequiredMixin):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        if not request.user.is_staff:
            return HttpResponseForbidden("Staff access required")
        return super().dispatch(request, *args, **kwargs)


# ── Dashboard ────────────────────────────────────────────────────────────────

class AdminDashboardView(StaffRequiredMixin, View):
    def get(self, request):
        context = {
            'total_users': CustomUser.objects.count(),
            'total_recipes': Recipe.objects.count(),
            'active_users': CustomUser.objects.filter(is_active=True).count(),
            'staff_members': CustomUser.objects.filter(is_staff=True).count(),
            'recent_activity': UserLog.objects.order_by('-timestamp')[:10],
            'recipes': Recipe.objects.all().order_by('-created_at')[:10],  # Show 10 most recent
        }
        return render(request, 'mgmt/admin_dashboard.html', context)


# ── User Management ─────────────────────────────────────────────────────────

# ── Recipe Management ───────────────────────────────────────────────────────

class ListRecipesView(StaffRequiredMixin, View):
    def get(self, request):
        recipes = Recipe.objects.all().order_by('-created_at')
        search = request.GET.get('search', '')
        category_slug = request.GET.get('category', '')

        if search:
            recipes = recipes.filter(name__icontains=search) | recipes.filter(description__icontains=search)
        
        if category_slug:
            recipes = recipes.filter(category__slug=category_slug)

        categories = Category.objects.all()

        return render(request, 'mgmt/recipe_manage.html', {
            'recipes': recipes,
            'categories': categories,
            'search': search,
            'current_category': category_slug,
        })


class CreateRecipeView(StaffRequiredMixin, View):
    def get(self, request):
        form = RecipeForm()
        return render(request, 'mgmt/recipe_form.html', {'form': form, 'title': 'Add Recipe'})

    def post(self, request):
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            recipe = form.save()
            UserLog.objects.create(
                user=request.user,
                action='recipe_created',
                details=f'Created recipe: {recipe.name}',
            )
            return redirect('recipe_manage')
        return render(request, 'mgmt/recipe_form.html', {'form': form, 'title': 'Add Recipe'})


class EditRecipeView(StaffRequiredMixin, View):
    def get(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        form = RecipeForm(instance=recipe)
        return render(request, 'mgmt/recipe_form.html', {'form': form, 'recipe': recipe, 'title': 'Edit Recipe'})

    def post(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        form = RecipeForm(request.POST, request.FILES, instance=recipe)
        if form.is_valid():
            recipe = form.save()
            UserLog.objects.create(
                user=request.user,
                action='recipe_updated',
                details=f'Updated recipe: {recipe.name}',
            )
            return redirect('recipe_manage')
        return render(request, 'mgmt/recipe_form.html', {'form': form, 'recipe': recipe, 'title': 'Edit Recipe'})


class DeleteRecipeView(StaffRequiredMixin, View):
    def get(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        return render(request, 'mgmt/delete_recipe.html', {'recipe': recipe})

    def post(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        name = recipe.name
        recipe.delete()
        UserLog.objects.create(
            user=request.user,
            action='recipe_deleted',
            details=f'Deleted recipe: {name}',
        )
        return redirect('recipe_manage')


# ── User list — supports fetch (X-Requested-With header) ────────────────────

class ListUsersView(StaffRequiredMixin, View):
    def get(self, request):
        users = CustomUser.objects.all()
        search = request.GET.get('search', '')
        user_type = request.GET.get('type', '')

        if search:
            users = (
                users.filter(email__icontains=search) |
                users.filter(first_name__icontains=search) |
                users.filter(last_name__icontains=search)
            )

        if user_type == 'staff':
            users = users.filter(is_staff=True)
        elif user_type == 'active':
            users = users.filter(is_active=True)
        elif user_type == 'inactive':
            users = users.filter(is_active=False)

        # fetch() from JS sends this header — return JSON instead of HTML
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            data = [
                {
                    'id': u.id,
                    'email': u.email,
                    'first_name': u.first_name,
                    'last_name': u.last_name,
                    'is_staff': u.is_staff,
                    'is_active': u.is_active,
                    'date_joined': u.date_joined.strftime('%b %d, %Y'),
                }
                for u in users
            ]
            return JsonResponse({'users': data})

        return render(request, 'mgmt/users.html', {
            'users': users,
            'search': search,
            'user_type': user_type,
        })


# ── User detail ──────────────────────────────────────────────────────────────

class UserDetailView(StaffRequiredMixin, View):
    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        user_activity = UserLog.objects.filter(user=user).order_by('-timestamp')[:20]
        return render(request, 'mgmt/user_detail.html', {
            'user': user,
            'user_activity': user_activity,
        })


# ── Actions — all return JSON so the page can update without a reload ────────

class ToggleStaffView(StaffRequiredMixin, View):
    """Called via fetch from user_detail.html. Returns updated is_staff value."""
    def post(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        user.is_staff = not user.is_staff
        user.save()
        UserLog.objects.create(
            user=user,
            action='staff_status_changed',
            details=f'Staff status set to {user.is_staff}',
        )
        return JsonResponse({'is_staff': user.is_staff})


class DeactivateUserView(StaffRequiredMixin, View):
    """Called via fetch from user_detail.html. Returns updated is_active value."""
    def post(self, request, user_id):
        if request.user.id == user_id:
            return JsonResponse({'error': 'You cannot deactivate your own account'}, status=400)
        user = get_object_or_404(CustomUser, id=user_id)
        user.is_active = not user.is_active
        user.save()
        UserLog.objects.create(
            user=user,
            action='account_activated' if user.is_active else 'account_deactivated',
            details=f'Account is now {"active" if user.is_active else "inactive"}',
        )
        return JsonResponse({'is_active': user.is_active})


class DeleteUserView(StaffRequiredMixin, View):
    """Called via fetch from user_detail.html. Returns {deleted: true} on success."""
    def post(self, request, user_id):
        if request.user.id == user_id:
            return JsonResponse({'error': 'You cannot delete your own account'}, status=400)
        user = get_object_or_404(CustomUser, id=user_id)
        email = user.email
        user.delete()
        UserLog.objects.create(
            user=request.user,
            action='user_deleted',
            details=f'Deleted account: {email}',
        )
        return JsonResponse({'deleted': True})
