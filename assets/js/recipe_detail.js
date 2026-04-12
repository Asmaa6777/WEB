

const detailImage = document.getElementById('detailImage');
const detailCourse = document.getElementById('detailCourse');
const detailName = document.getElementById('detailName');
const detailDescription = document.getElementById('detailDescription');
const ingredientsList = document.getElementById('ingredientsList');
const instructionsList = document.getElementById('instructionsList');
const btnFavourite = document.getElementById('btnFavourite');
const btnEdit = document.getElementById('btnEdit');
const btnDelete = document.getElementById('btnDelete');
const navUsername = document.getElementById('navUsername');

 
const params = new URLSearchParams(window.location.search);
const recipeId = parseInt(params.get('id'));

 
const currentUser = getCurrentUser();

if (currentUser && navUsername) {
  navUsername.textContent = currentUser.name;
}
 
const recipes = getRecipes();
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
  detailImage.onerror = function () { this.src = '../../assets/images/placeholder.svg'; };

  detailCourse.textContent = formatCourse(recipe.course);
  detailName.textContent = recipe.name;
  detailDescription.textContent = recipe.description;
 
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  
  if (instructionsList && recipe.instructions) {
    recipe.instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      instructionsList.appendChild(li);
    });
  }
 
  const recipeViews = getRecipeViews();
  recipeViews[recipe.id] = (recipeViews[recipe.id] || 0) + 1;
  localStorage.setItem('recipeViews', JSON.stringify(recipeViews));
 
  if (currentUser && currentUser.role === 'user') {
    btnFavourite.style.display = 'inline-block';

    const favourites = getFavourites();
    if (favourites.includes(recipe.id)) {
      btnFavourite.textContent = '♥ In Favourites';
      btnFavourite.disabled = true;
    }

    btnFavourite.addEventListener('click', () => {
      const favourites = getFavourites();

      if (favourites.includes(recipe.id)) {
        btnFavourite.textContent = '♥ In Favourites';
        btnFavourite.disabled = true;
        return;
      }

      favourites.push(recipe.id);
      saveFavourites(favourites);

      const favCounts = getFavouriteCounts();
      favCounts[recipe.id] = (favCounts[recipe.id] || 0) + 1;
      localStorage.setItem('favoriteCounts', JSON.stringify(favCounts));

      btnFavourite.textContent = '♥ In Favourites';
      btnFavourite.disabled = true;
    });
  }

  if (currentUser && currentUser.role === 'admin') {
    btnEdit.style.display = 'inline-block';
    btnDelete.style.display = 'inline-block';
    btnEdit.href = `/WEB/pages/admin_pages/edit_recipe.html?id=${recipe.id}`;
    btnDelete.href = `/WEB/pages/admin_pages/delete_recipe.html?id=${recipe.id}&name=${encodeURIComponent(recipe.name)}`;
  }
}

 
function formatCourse(course) {
  const map = {
    'appetizer': 'Appetizer',
    'main-course': 'Main Course',
    'dessert': 'Dessert'
  };
  return map[course] || course;
}
 
const logoutLink = document.querySelector('.nav-logout');
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '/WEB/pages/login.html';
  });
}