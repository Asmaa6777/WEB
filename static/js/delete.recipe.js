 

document.addEventListener('DOMContentLoaded', () => {

  // Protect page — admins only
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = '../login.html';
    return;
  }

  // Read recipe ID and name from URL
  const params = new URLSearchParams(window.location.search);
  const recipeId = parseInt(params.get('id'));

  // Find recipe in localStorage
  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    document.getElementById('recipeInfo').innerHTML = '<p>Recipe not found.</p>';
    document.getElementById('confirmDeleteBtn').style.display = 'none';
    return;
  }

  // Populate recipe info
  document.getElementById('recipeName').textContent = recipe.name;
  document.getElementById('recipeCourse').textContent = recipe.course;

  // Confirm delete
  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    const updated = recipes.filter(r => r.id !== recipeId);
    saveRecipes(updated);
    window.location.href = 'recipes.html';
  });

  // Cancel
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    window.history.back();
  });

});