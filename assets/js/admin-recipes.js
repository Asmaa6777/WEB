const recipeGrid = document.getElementById('recipeGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.pill');

let currentFilter = 'all';
let currentSearch = '';

function imgSrc(filename) {
  const base = '../../assets/images/';
  const value = String(filename || '').trim().replace(/\\/g, '/');

  if (!value) {
    return base + 'placeholder.svg';
  }

  if (/^(https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  if (value.toLowerCase().includes('fakepath')) {
    return base + 'placeholder.svg';
  }

  const cleanName = value.split('/').pop();
  return base + (cleanName || 'placeholder.svg');
}

const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
if (!currentUser || currentUser.role !== 'admin') {
  window.location.href = '../login.html';
}

function formatCourse(course) {
  const map = {
    'appetizer': 'Appetizer',
    'main-course': 'Main Course',
    'dessert': 'Dessert'
  };
  return map[course] || course;
}

function renderRecipes() {
  const recipes = typeof getRecipes === 'function' ? getRecipes() : initialRecipes;

  const filtered = recipes.filter(recipe => {
    const matchesCourse = currentFilter === 'all' || recipe.course === currentFilter;
    const query = currentSearch.toLowerCase();
    const ingredientText = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map(item => typeof item === 'string' ? item : item.name || '').join(' ')
      : '';

    return matchesCourse && (
      recipe.name.toLowerCase().includes(query) ||
      ingredientText.toLowerCase().includes(query)
    );
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
          <a href="../user_pages/recipe_detail.html?id=${recipe.id}" class="btn-view">View</a>
          <a href="edit_recipe.html?id=${recipe.id}" class="btn-edit">Edit</a>
          <a href="delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}" class="btn-delete">Delete</a>
        </div>
      </div>
    `;

    recipeGrid.appendChild(card);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('active'));
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
