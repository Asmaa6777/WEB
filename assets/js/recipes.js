

const recipeGrid = document.getElementById('recipeGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.pill');
const navUsername = document.getElementById('navUsername');

let currentFilter = 'all';
let currentSearch = '';

const currentUser = getCurrentUser();

if (currentUser && navUsername) {
  navUsername.textContent = currentUser.name;
}


function renderRecipes() {
  const recipes = getRecipes();

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

    let actionButtons = `<a href="/WEB/pages/user_pages/recipe_detail.html?id=${recipe.id}" class="btn-view">View Recipe</a>`;

    if (currentUser && currentUser.role === 'user') {
      const favourites = getFavourites();
      const isFav = favourites.includes(recipe.id);
      actionButtons += `<button class="btn-fav" onclick="addToFavourites(${recipe.id}, event)">${isFav ? '♥' : '♡'}</button>`;
    }

    if (currentUser && currentUser.role === 'admin') {
      actionButtons += `
        <a href="/WEB/pages/admin_pages/edit_recipe.html?id=${recipe.id}" class="btn-edit">Edit</a>
        <a href="/WEB/pages/admin_pages/delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}" class="btn-delete">Delete</a>
      `;
    }

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${recipe.image}" alt="${recipe.name}" class="card-img" onerror="this.src='/WEB/assets/images/placeholder.jpg'"/>
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

function addToFavourites(recipeId, event) {
  event.preventDefault();
  const favourites = getFavourites();

  if (favourites.includes(recipeId)) {
    alert('Already in your favourites!');
    return;
  }

  favourites.push(recipeId);
  saveFavourites(favourites);

  const favCounts = getFavouriteCounts();
  favCounts[recipeId] = (favCounts[recipeId] || 0) + 1;
  localStorage.setItem('favoriteCounts', JSON.stringify(favCounts));

  alert('Added to favourites!');
  renderRecipes();
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
 
const logoutLink = document.querySelector('.nav-logout');
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '/WEB/pages/login.html';
  });
}

renderRecipes();