from django.shortcuts import render

<<<<<<< HEAD
def homepage(request):
    return render(request, 'recipes/homepage.html')

def login_view(request):
    return render(request, 'recipes/login.html')

def signup_view(request):
    return render(request, 'recipes/signup.html')

def recipes_list(request):
    return render(request, 'recipes/user/recipes.html')

def trending(request):
    return render(request, 'recipes/user/trending.html')

def favorites(request):
    return render(request, 'recipes/user/favorites.html')

def profile(request):
    return render(request, 'recipes/user/profile.html')

def recipe_detail(request):
    return render(request, 'recipes/user/recipe_detail.html')

def search_results(request):
    return render(request, 'recipes/user/search-results.html')

# Admin views
def admin_dashboard(request):
    return render(request, 'recipes/admin/admin_dashboard.html')

def admin_recipes(request):
    return render(request, 'recipes/admin/recipes.html')

def add_recipe(request):
    return render(request, 'recipes/admin/add_recipe.html')

def edit_recipe(request):
    return render(request, 'recipes/admin/edit_recipe.html')

def delete_recipe(request):
    return render(request, 'recipes/admin/delete_recipe.html')

def admin_profile(request):
    return render(request, 'recipes/admin/profile.html')
=======
# Create your views here.
>>>>>>> origin/iman-mange
