from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.db.models import Count
from recipes.models import Recipe
from .models import Favorite

@require_POST
def toggle_favorite(request, recipe_id):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Authentication required'}, status=403)
    recipe = get_object_or_404(Recipe, id=recipe_id)
    favorite, created = Favorite.objects.get_or_create(user=request.user, recipe=recipe)
    if not created:
        favorite.delete()
        return JsonResponse({'status': 'removed'})
    return JsonResponse({'status': 'added'})

@login_required
def favorites(request):
    # Fetch recipes where favorites__user=request.user
    favorite_recipes = Recipe.objects.filter(favorites__user=request.user)
    return render(request, 'social/favorites.html', {'recipes': favorite_recipes})

def trending(request):
    # Annotate Recipe with Count('favorites'), order by -fav_count, top 10
    trending_recipes = list(
        Recipe.objects.annotate(fav_count=Count('favorites')).order_by('-fav_count')[:10]
    )
    favorite_recipe_ids = set()
    if request.user.is_authenticated and trending_recipes:
        ids = [r.id for r in trending_recipes]
        favorite_recipe_ids = set(
            Favorite.objects.filter(user=request.user, recipe_id__in=ids).values_list(
                'recipe_id', flat=True
            )
        )
    return render(
        request,
        'social/trending.html',
        {
            'recipes': trending_recipes,
            'favorite_recipe_ids': favorite_recipe_ids,
        },
    )
