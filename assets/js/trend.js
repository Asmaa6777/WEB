document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("recipes-container");
 let cardsHTML = ""; 
 var sortedRecipes = recipes.slice().sort((a, b) => {
        const viewsA = JSON.parse(localStorage.getItem('recipeViews'))?.[a.id] || 0;
        const viewsB = JSON.parse(localStorage.getItem('recipeViews'))?.[b.id] || 0;
        return viewsB - viewsA; 
    });
    var topRecipes = sortedRecipes.slice(0, 5);
    var topnumber = 1;
 topRecipes.forEach(recipe => {
            cardsHTML += `
                <div class="card">
                    <p class="course-label">${recipe.course}</p>
                    <p class = "topnumber">#${topnumber++}</p>
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <div class="card-content">
                        <h3>${recipe.name}</h3>
                        <p>${recipe.description}</p>
                        <a href ="../pages/user_pages/recipe_detail.html?id=${recipe.id}" class="btn-view">View Recipe</a>
                        
                        
                    </div>
                </div>
            `;
        });

        container.innerHTML = cardsHTML;
    } 
);