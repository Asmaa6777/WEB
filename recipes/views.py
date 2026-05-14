from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from .models import Recipe
from .forms import RecipeForm

# LIST RECIPES
class ListRecipesView(View):
    def get(self, request):
        recipes = Recipe.objects.all()
        return render(request, 'recipes/recipe_manage.html', {'recipes': recipes})

# CREATE RECIPE
class CreateRecipeView(View):
    def get(self, request):
        form = RecipeForm()
        return render(request, 'recipes/recipe_form.html', {'form': form})
    
    def post(self, request):
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.created_by = request.user
            recipe.save()
            return redirect('recipe_list')
        return render(request, 'recipes/recipe_form.html', {'form': form})

# EDIT RECIPE
class EditRecipeView(View):
    def get(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        form = RecipeForm(instance=recipe)
        return render(request, 'recipes/recipe_form.html', {'form': form, 'recipe': recipe})
    
    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        form = RecipeForm(request.POST, request.FILES, instance=recipe)
        if form.is_valid():
            form.save()
            return redirect('recipe_list')
        return render(request, 'recipes/recipe_form.html', {'form': form, 'recipe': recipe})

# DELETE RECIPE
class DeleteRecipeView(View):
    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        recipe.delete()
        return redirect('recipe_list')
    
    def get(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        recipe.delete()
        return redirect('recipe_list')