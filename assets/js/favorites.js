// assets/js/favorites.js

const recipeGrid  = document.getElementById('recipeGrid');
const emptyState  = document.getElementById('emptyState');
const filterPills = document.querySelectorAll('.pill');
const navUsername = document.getElementById('navUsername');

let currentFilter = 'all';

// ── Image path helper ─────────────────────────────────────────────
function imgSrc(filename) {
  const base = typeof IMAGE_BASE !== 'undefined' ? IMAGE_BASE : '../../assets/images/';
  return base + filename;
}

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) navUsername.textContent = currentUser.name;

document.querySelector('.nav-logout').addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('currentUser');
  window.location.href = '../login.html';
});

function formatCourse(course) {
  const map = { 'appetizer': 'Appetizer', 'main-course': 'Main Course', 'dessert': 'Dessert' };
  return map[course] || course;
}

function getFavouriteIds() {
  // Always return as numbers so === comparisons work reliably
  return (JSON.parse(localStorage.getItem('favourites')) || []).map(Number);
}

function removeFromFavourites(recipeId) {
  const favs = getFavouriteIds().filter(id => id !== Number(recipeId));
  localStorage.setItem('favourites', JSON.stringify(favs));
  renderFavourites();
}

function renderFavourites() {
  const favIds = getFavouriteIds();

  // All saved recipes (regardless of active filter)
  const allFavRecipes = initialRecipes.filter(r => favIds.includes(Number(r.id)));

  // Filtered subset for display
  const favRecipes = currentFilter === 'all'
    ? allFavRecipes
    : allFavRecipes.filter(r => r.course === currentFilter);

  recipeGrid.innerHTML = '';

  if (allFavRecipes.length === 0) {
    emptyState.style.display = 'block';
    emptyState.querySelector('p').innerHTML =
      'No favourite recipes yet. <a href="recipes.html">Browse recipes</a> and add some!';
    return;
  }

  if (favRecipes.length === 0) {
    emptyState.style.display = 'block';
    emptyState.querySelector('p').innerHTML = 'No favourites in this category.';
    return;
  }

  emptyState.style.display = 'none';

  favRecipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${imgSrc(recipe.image)}" alt="${recipe.name}" class="card-img"
             onerror="this.src='${imgSrc('placeholder.svg')}'"/>
        <span class="course-tag">${formatCourse(recipe.course)}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${recipe.name}</h3>
        <p class="card-desc">${recipe.description}</p>
        <div class="card-actions">
          <a href="recipe_detail.html?id=${recipe.id}" class="btn-view">View Recipe</a>
          <button class="btn-fav saved" onclick="removeFromFavourites(${recipe.id})">♥ Remove</button>
        </div>
      </div>
    `;
    recipeGrid.appendChild(card);
  });
}

filterPills.forEach(btn => {
  btn.addEventListener('click', () => {
    filterPills.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderFavourites();
  });
});

renderFavourites();