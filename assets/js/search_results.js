// assets/js/search_results.js

const recipeGrid  = document.getElementById('recipeGrid');
const emptyState  = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterPills = document.querySelectorAll('.pill');
const navUsername = document.getElementById('navUsername');

let currentFilter = 'all';
let currentSearch = '';


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
  return JSON.parse(localStorage.getItem('favourites')) || [];
}


function addToFavourites(recipeId, btn) {
  const favs = getFavouriteIds();

  if (favs.includes(recipeId)) {
    alert('Already in your favourites!');
    return;
  }

  favs.push(recipeId);
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
    if (confirm('Added to favourites! View your favorites now?')) {
      window.location.href = 'favorites.html';
    }
  }, 500);
}


function renderRecipes() {
  const favIds = getFavouriteIds();

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
    const isSaved = favIds.includes(recipe.id);
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    let actionButtons = `<a href="recipe_detail.html?id=${recipe.id}" class="btn-view">View Recipe</a>`;

    if (currentUser && currentUser.role === 'user') {
      actionButtons += `
        <button class="btn-fav ${isSaved ? 'saved' : ''}"
          ${isSaved ? 'disabled' : ''}
          onclick="addToFavourites(${recipe.id}, this)">
          ${isSaved ? '♥ Saved' : '♡ Save'}
        </button>`;
    }

    if (currentUser && currentUser.role === 'admin') {
      actionButtons += `
        <a href="edit_recipe.html?id=${recipe.id}" class="btn-edit">Edit</a>
        <a href="delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}" class="btn-delete">Delete</a>`;
    }

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${recipe.image}" alt="${recipe.name}" class="card-img"
             onerror="this.src='../../assets/images/placeholder.svg'"/>
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


filterPills.forEach(btn => {
  btn.addEventListener('click', () => {
    filterPills.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderRecipes();
  });
});


searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim();
  renderRecipes();
});


const params = new URLSearchParams(window.location.search);
const queryParam = params.get('q');
if (queryParam) {
  searchInput.value = queryParam;
  currentSearch = queryParam;
}

renderRecipes();