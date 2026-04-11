// js/recipe_detail.js

const detailImage = document.getElementById('detailImage');
const detailCourse = document.getElementById('detailCourse');
const detailName = document.getElementById('detailName');
const detailDescription = document.getElementById('detailDescription');
const ingredientsList = document.getElementById('ingredientsList');
const btnFavourite = document.getElementById('btnFavourite');
const btnEdit = document.getElementById('btnEdit');
const btnDelete = document.getElementById('btnDelete');
const navUsername = document.getElementById('navUsername');

// ── Get recipe ID from URL ────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const recipeId = parseInt(params.get('id'));

// ── Load current user ─────────────────────────────────────────────
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
  navUsername.textContent = currentUser.name;
}

// ── Find recipe ───────────────────────────────────────────────────
const recipe = recipes.find(r => r.id === recipeId);

if (!recipe) {
  document.querySelector('.detail-section').innerHTML = `
    <p style="color: var(--text-muted); padding: 48px;">
      Recipe not found. <a href="recipes.html" style="color: var(--gold);">Back to recipes</a>
    </p>
  `;
} else {

  document.title = `RecipeFinder — ${recipe.name}`;
  detailImage.src = recipe.image;
  detailImage.alt = recipe.name;
  detailImage.onerror = function () { this.src = '/WEB/assets/images/placeholder.jpg'; };
  detailCourse.textContent = formatCourse(recipe.course);
  detailName.textContent = recipe.name;
  detailDescription.textContent = recipe.description;

  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  // ── Track views ───────────────────────────────────────────────
  const recipeViews = JSON.parse(localStorage.getItem('recipeViews')) || {};
  recipeViews[recipe.id] = (recipeViews[recipe.id] || 0) + 1;
  localStorage.setItem('recipeViews', JSON.stringify(recipeViews));

  // ── Role based buttons ────────────────────────────────────────
  if (currentUser && currentUser.role === 'user') {
    btnFavourite.style.display = 'inline-block';

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (favourites.includes(recipe.id)) {
      btnFavourite.textContent = '♥ In Favourites';
      btnFavourite.disabled = true;
    }

    btnFavourite.addEventListener('click', () => {
      const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      if (favourites.includes(recipe.id)) {
        btnFavourite.textContent = '♥ In Favourites';
        btnFavourite.disabled = true;
        return;
      }
      favourites.push(recipe.id);
      localStorage.setItem('favourites', JSON.stringify(favourites));

      const favCounts = JSON.parse(localStorage.getItem('favoriteCounts')) || {};
      favCounts[recipe.id] = (favCounts[recipe.id] || 0) + 1;
      localStorage.setItem('favoriteCounts', JSON.stringify(favCounts));

      btnFavourite.textContent = '♥ In Favourites';
      btnFavourite.disabled = true;
    });
  }

  if (currentUser && currentUser.role === 'admin') {
    btnEdit.style.display = 'inline-block';
    btnDelete.style.display = 'inline-block';
    btnEdit.href = `/WEB/pages/user_pages/edit_recipe.html?id=${recipe.id}`;
    btnDelete.href = `/WEB/pages/user_pages/delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}`;
  }
}

// ── Format course ─────────────────────────────────────────────────
function formatCourse(course) {
  const map = {
    'appetizer': 'Appetizer',
    'main-course': 'Main Course',
    'dessert': 'Dessert'
  };
  return map[course] || course;
}

// ── Logout ────────────────────────────────────────────────────────
const logoutLink = document.querySelector('.nav-logout');
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '/WEB/pages/login.html';
  });
}