// js/recipes.js

const recipeGrid = document.getElementById('recipeGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.pill');
const navUsername = document.getElementById('navUsername');

let currentFilter = 'all';
let currentSearch = '';

// ── Load current user from localStorage ──────────────────────────
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
  navUsername.textContent = currentUser.name;
}

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

  filtered.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.setAttribute('data-course', recipe.course);

    // Build action buttons based on role
    let actionButtons = `<a href="recipe_detail.html?id=${recipe.id}" class="btn-view">View Recipe</a>`;

    if (currentUser && currentUser.role === 'user') {
      actionButtons += `<button class="btn-fav" onclick="addToFavourites(${recipe.id}, event)">&#9825;</button>`;
    }

    if (currentUser && currentUser.role === 'admin') {
      actionButtons += `
        <a href="edit_recipe.html?id=${recipe.id}" class="btn-edit">Edit</a>
        <a href="delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}" class="btn-delete">Delete</a>
      `;
    }

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${recipe.image}" alt="${recipe.name}" class="card-img" onerror="this.src='images/placeholder.jpg'"/>
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

// ── Format course label ───────────────────────────────────────────
function formatCourse(course) {
  const map = {
    'appetizer': 'Appetizer',
    'main-course': 'Main Course',
    'dessert': 'Dessert'
  };
  return map[course] || course;
}

// ── Add to favourites ─────────────────────────────────────────────
function addToFavourites(recipeId, event) {
  event.preventDefault();
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  if (favourites.includes(recipeId)) {
    alert('Already in your favourites!');
    return;
  }

  favourites.push(recipeId);
  localStorage.setItem('favourites', JSON.stringify(favourites));

  // Update favourite counts for trending
  const favCounts = JSON.parse(localStorage.getItem('favoriteCounts')) || {};
  favCounts[recipeId] = (favCounts[recipeId] || 0) + 1;
  localStorage.setItem('favoriteCounts', JSON.stringify(favCounts));

  alert('Added to favourites!');
}

// ── Filter pills ──────────────────────────────────────────────────
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderRecipes();
  });
});

// ── Search input ──────────────────────────────────────────────────
searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim();
  renderRecipes();
});

// ── Logout ────────────────────────────────────────────────────────
const logoutLink = document.querySelector('.nav-logout');
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}

// ── Init ──────────────────────────────────────────────────────────
renderRecipes();