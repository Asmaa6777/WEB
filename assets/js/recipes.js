// js/recipes.js

const recipeGrid = document.getElementById('recipeGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.pill');

let currentFilter = 'all';
let currentSearch = '';

// ── Image path helper ─────────────────────────────────────────────
function imgSrc(filename) {
  const base = typeof IMAGE_BASE !== 'undefined' ? IMAGE_BASE : '../../assets/images/';
  return base + (filename || 'placeholder.svg');
}

// ── Load current user from localStorage ──────────────────────────
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Use initial recipes like trending
const recipes = initialRecipes;

// ── Render recipe cards ───────────────────────────────────────────
function renderRecipes() {
  const filtered = recipes.filter(recipe => {
    const matchesCourse = currentFilter === 'all' || recipe.course === currentFilter;
    const query = currentSearch.toLowerCase();
    const matchesSearch =
      recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.some(i => i.toLowerCase().includes(query));
    return matchesCourse && matchesSearch;
  });

  recipeGrid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // Normalise stored IDs to numbers for comparison
  const rawFavs = JSON.parse(localStorage.getItem('favourites')) || [];
  const favIds = rawFavs.map(Number);

  filtered.forEach(recipe => {
    const isSaved = favIds.includes(Number(recipe.id));
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.setAttribute('data-course', recipe.course);

    let actionButtons = `<a href="recipe_detail.html?id=${recipe.id}" class="btn-view">View Recipe</a>`;

    if (currentUser) {
      actionButtons += `
        <button
          class="btn-fav ${isSaved ? 'saved' : ''}"
          ${isSaved ? 'disabled' : ''}
          onclick="addToFavourites(${recipe.id}, this)">
          ${isSaved ? '♥ Saved' : '♡ Add to Favourites'}
        </button>`;
    }

    if (currentUser && currentUser.role === 'admin') {
      actionButtons += `
        <a href="edit_recipe.html?id=${recipe.id}" class="btn-edit">Edit</a>
        <a href="delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}" class="btn-delete">Delete</a>
      `;
    }

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${imgSrc(recipe.image)}" alt="${recipe.name}" class="card-img"
             onerror="this.src='${imgSrc('placeholder.svg')}'"/>
        <span class="course-tag">${formatCourse(recipe.course)}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${recipe.name}</h3>
        <p class="card-desc">${recipe.description}</p>
        <div class="card-actions">${actionButtons}</div>
      </div>
    `;

    recipeGrid.appendChild(card);
  });
}


function formatCourse(course) {
  const map = {
    'appetizer': 'Appetizer',
    'main-course': 'Main Course',
    'dessert': 'Dessert'
  };
  return map[course] || course;
}


function addToFavourites(recipeId, btn) {
  const rawFavs = JSON.parse(localStorage.getItem('favourites')) || [];
  const favs = rawFavs.map(Number);

  if (favs.includes(Number(recipeId))) {
    alert('Already in your favourites!');
    return;
  }

  favs.push(Number(recipeId));
  localStorage.setItem('favourites', JSON.stringify(favs));

  // Update trending counts
  const favCounts = JSON.parse(localStorage.getItem('favoriteCounts')) || {};
  favCounts[recipeId] = (favCounts[recipeId] || 0) + 1;
  localStorage.setItem('favoriteCounts', JSON.stringify(favCounts));

  // Update button immediately
  btn.textContent = '♥ Saved';
  btn.classList.add('saved');
  btn.disabled = true;

  // Show success message with link to favorites
  setTimeout(() => {
    if (confirm('Added to favourites! View your favourites now?')) {
      window.location.href = 'favorites.html';
    }
  }, 500);
}


filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderRecipes();
  });
});


searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim();
  renderRecipes();
});


renderRecipes();
