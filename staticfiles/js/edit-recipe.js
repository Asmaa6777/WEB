// assets/js/edit-recipe.js

document.addEventListener('DOMContentLoaded', () => {

  // Protect page
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = '../login.html';
    return;
  }

  // Get recipe ID from URL
  const params = new URLSearchParams(window.location.search);
  const recipeId = parseInt(params.get('id'));

  // Find recipe
  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    alert('Recipe not found.');
    window.location.href = 'recipes.html';
    return;
  }

  // Pre-fill all form fields
  document.getElementById('recipeName').value = recipe.name || '';
  document.getElementById('description').value = recipe.description || '';
  document.getElementById('prepTime').value = recipe.prepTime || '';
  document.getElementById('cookTime').value = recipe.cookTime || '';
  document.getElementById('servings').value = recipe.servings || '';

  // Pre-fill instructions
  const instructionsField = document.getElementById('instructions');
  if (instructionsField) {
    instructionsField.value = Array.isArray(recipe.instructions)
      ? recipe.instructions.join('\n')
      : recipe.instructions || '';
  }

  // Pre-fill course/cuisine/difficulty if those selects exist
  const cuisineField = document.getElementById('cuisine');
  const mealField = document.getElementById('meal');
  const difficultyField = document.getElementById('difficulty');

  if (cuisineField && recipe.cuisine) cuisineField.value = recipe.cuisine;
  if (mealField && recipe.meal) mealField.value = recipe.meal;
  if (difficultyField && recipe.difficulty) difficultyField.value = recipe.difficulty;

  // Handle save
  document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('recipeName').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!name) {
      alert('Recipe name is required.');
      return;
    }

    if (!description) {
      alert('Description is required.');
      return;
    }

    // Parse instructions back to array
    const instructionsRaw = document.getElementById('instructions').value;
    const instructions = instructionsRaw
      .split('\n')
      .map(s => s.trim())
      .filter(s => s !== '');

    const updatedRecipe = {
      ...recipe,
      name,
      description,
      prepTime: document.getElementById('prepTime').value,
      cookTime: document.getElementById('cookTime').value,
      servings: document.getElementById('servings').value,
      instructions,
      cuisine: cuisineField ? cuisineField.value : recipe.cuisine,
      meal: mealField ? mealField.value : recipe.meal,
      difficulty: difficultyField ? difficultyField.value : recipe.difficulty
    };

    // Update in localStorage
    const index = recipes.findIndex(r => r.id === recipeId);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      saveRecipes(recipes);
      alert('Recipe updated successfully!');
      window.location.href = 'recipes.html';
    } else {
      alert('Error: Recipe not found in storage.');
    }
  });

});