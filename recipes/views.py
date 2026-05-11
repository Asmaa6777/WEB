from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import Recipe, Category

def homepage(request):
    """View for the landing page - showing featured and classic recipes"""
    featured_recipes = Recipe.objects.all().order_by('-created_at')[:6]
    
    # Selecting specific "Classic" recipes by ID (Carbonara, Pizza, Tiramisu, Macarons)
    classic_ids = [1, 13, 12, 18]
    classic_recipes = Recipe.objects.filter(id__in=classic_ids)
    
    categories = Category.objects.all()
    
    return render(request, 'recipes/homepage.html', {
        'featured_recipes': featured_recipes,
        'classic_recipes': classic_recipes,
        'categories': categories
    })

def recipes_list(request, category_slug=None):
    """View for all recipes with category filtering (via URL slug or query param)"""
    if not category_slug:
        category_slug = request.GET.get('category')
        
    if category_slug:
        category = get_object_or_404(Category, slug__iexact=category_slug)
        recipes = Recipe.objects.filter(category=category)
    else:
        recipes = Recipe.objects.all()
    
    categories = Category.objects.all()
    return render(request, 'recipes/recipes.html', {
        'recipes': recipes,
        'categories': categories,
        'selected_category': category_slug
    })

def recipe_detail(request, pk):
    """View for a single recipe's details"""
    recipe = get_object_or_404(Recipe, pk=pk)
    is_favorite = False
    if request.user.is_authenticated:
        from social.models import Favorite
        is_favorite = Favorite.objects.filter(user=request.user, recipe=recipe).exists()
    return render(request, 'recipes/recipe_detail.html', {
        'recipe': recipe,
        'is_favorite': is_favorite,
    })

def search_results(request):
    """View for searching recipes by name or ingredients"""
    query = request.GET.get('q', '')
    if query:
        recipes = Recipe.objects.filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query) |
            Q(ingredients__icontains=query)
        ).distinct()
    else:
        recipes = Recipe.objects.none()
    
    return render(request, 'recipes/search_results.html', {
        'recipes': recipes,
        'query': query
    })
