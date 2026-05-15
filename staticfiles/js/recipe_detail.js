// assets/js/recipe_detail.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Image path helper ───────────────────────────────────────────
  function imgSrc(filename) {
    const base = '../../assets/images/';
    const value = String(filename || '').trim();
    if (!value) return base + 'placeholder.svg';
    if (/^(https?:|data:|blob:)/i.test(value)) return value;
    const cleanName = value.split('/').pop();
    return base + (cleanName || 'placeholder.svg');
  }

  function formatCourse(course) {
    const map = {
      'appetizer': 'Appetizer',
      'main-course': 'Main Course',
      'dessert': 'Dessert'
    };
    return map[course] || course;
  }

  // ── Elements ────────────────────────────────────────────────────
  const detailImage = document.getElementById('detailImage');
  const detailCourse = document.getElementById('detailCourse');
  const detailName = document.getElementById('detailName');
  const detailDescription = document.getElementById('detailDescription');
  const ingredientsList = document.getElementById('ingredientsList');
  const instructionsList = document.getElementById('instructionsList');
  const btnFavourite = document.getElementById('btnFavourite');
  const btnEdit = document.getElementById('btnEdit');
  const btnDelete = document.getElementById('btnDelete');

  // ── Get recipe ID from URL ──────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const recipeId = parseInt(params.get('id'));

  // ── Load current user and recipes ───────────────────────────────
  const currentUser = getCurrentUser();
  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    document.querySelector('.detail-section').innerHTML = `
      <p style="color: var(--text-muted); padding: 48px;">
        Recipe not found. <a href="recipes.html" style="color: var(--gold);">Back to recipes</a>
      </p>
    `;
    return;
  }

  // ── Populate page ───────────────────────────────────────────────
  document.title = `RecipeFinder — ${recipe.name}`;

  detailImage.src = imgSrc(recipe.image);
  detailImage.alt = recipe.name;
  detailImage.onerror = function () {
    this.src = '../../assets/images/placeholder.svg';
  };

  detailCourse.textContent = formatCourse(recipe.course);
  detailName.textContent = recipe.name;
  detailDescription.textContent = recipe.description;

  // ── Ingredients ─────────────────────────────────────────────────
  if (ingredientsList) {
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = typeof ingredient === 'string'
        ? ingredient
        : `${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.name || ''}`.trim();
      ingredientsList.appendChild(li);
    });
  }

  // ── Instructions ────────────────────────────────────────────────
  if (instructionsList && recipe.instructions) {
    const steps = Array.isArray(recipe.instructions)
      ? recipe.instructions
      : recipe.instructions.split('\n').filter(s => s.trim() !== '');

    steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      instructionsList.appendChild(li);
    });
  }

  // ── Track views for trending ────────────────────────────────────
  const recipeViews = getRecipeViews();
  recipeViews[recipe.id] = (recipeViews[recipe.id] || 0) + 1;
  localStorage.setItem('recipeViews', JSON.stringify(recipeViews));

  // ── Role based buttons ──────────────────────────────────────────
  if (currentUser && currentUser.role === 'user') {
    if (btnFavourite) {
      btnFavourite.style.display = 'inline-block';

      const favourites = getFavourites();
      const alreadySaved = favourites.map(Number).includes(Number(recipe.id));

      if (alreadySaved) {
        btnFavourite.textContent = '♥ In Favourites';
        btnFavourite.disabled = true;
      }

      btnFavourite.addEventListener('click', () => {
        const currentFavs = getFavourites().map(Number);

        if (currentFavs.includes(Number(recipe.id))) {
          btnFavourite.textContent = '♥ In Favourites';
          btnFavourite.disabled = true;
          return;
        }

        currentFavs.push(Number(recipe.id));
        saveFavourites(currentFavs);

        const favCounts = getFavouriteCounts();
        favCounts[recipe.id] = (favCounts[recipe.id] || 0) + 1;
        localStorage.setItem('favoriteCounts', JSON.stringify(favCounts));

        btnFavourite.textContent = '♥ In Favourites';
        btnFavourite.disabled = true;
      });
    }
  }

  if (currentUser && currentUser.role === 'admin') {
    if (btnEdit) {
      btnEdit.style.display = 'inline-block';
      btnEdit.href = `../admin_pages/edit_recipe.html?id=${recipe.id}`;
    }
    if (btnDelete) {
      btnDelete.style.display = 'inline-block';
      btnDelete.href = `../admin_pages/delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}`;
    }
  }

});