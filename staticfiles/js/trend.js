document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("recipes-container");
 let cardsHTML = ""; 
 var sortedRecipes = initialRecipes.slice().sort((a, b) => {
        const viewsA = JSON.parse(localStorage.getItem('recipeViews'))?.[a.id] || 0;
        const viewsB = JSON.parse(localStorage.getItem('recipeViews'))?.[b.id] || 0;
        return viewsB - viewsA; 
    });
    var topRecipes = sortedRecipes.slice(0, 5);
    var topnumber = 1;
 topRecipes.forEach(initialRecipes => {
            cardsHTML += `
                <div class="card">
                    <p class="course-label">${initialRecipes.course}</p>
                    <p class = "topnumber">#${topnumber++}</p>
                    <img src="${imgSrc(initialRecipes.image)}" alt="${initialRecipes.name}" onerror="this.src='${imgSrc('placeholder.svg')}'">
                    <div class="card-content">
                        <h3>${initialRecipes.name}</h3>
                        <p>${initialRecipes.description}</p>
                        <a href ="recipe_detail.html?id=${initialRecipes.id}" class="btn-view">View Recipe</a>
                        
                        
                    </div>
                </div>
            `;
        });

        container.innerHTML = cardsHTML;
    } 
);

// ── Image path helper ─────────────────────────────────────────────
function imgSrc(filename) {
  const base = typeof IMAGE_BASE !== 'undefined' ? IMAGE_BASE : '../assets/images/';
  return base + filename;
}