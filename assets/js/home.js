document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA SOURCE: Using helper functions from data.js
    const allRecipes = typeof getRecipes === 'function' ? getRecipes() : [];
    
    const recipeCarousel = document.getElementById('recipeCarousel');
    const timelessCarousel = document.getElementById('timelessCarousel');

    // 2. THE CARD BUILDER
    function buildCardHTML(recipe) {
        const savedFavorites = typeof getFavourites === 'function' ? getFavourites() : [];
        const isFavorited = savedFavorites.includes(recipe.id);
        const badgeText = recipe.course ? recipe.course.replace('-', ' ').toUpperCase() : 'RECIPE';
        const fill = isFavorited ? '#d4af37' : 'none';
        const stroke = isFavorited ? '#d4af37' : 'currentColor';
        const imagePath = `../assets/images/${recipe.image}`;

        return `
            <div class="recipe-card">
                <div class="card-image-wrapper">
                    <span class="badge">${badgeText}</span>
                    <button class="heart-btn ${isFavorited ? 'active' : ''}" data-id="${recipe.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <img src="${imagePath}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Recipe+Image'">
                </div>
                <div class="card-content">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <a href="user_pages/recipe_detail.html?id=${recipe.id}" class="view-recipe">View Recipe &rarr;</a>
                </div>
            </div>
        `;
    }

    // 3. INITIALIZE PAGE
    updateAuthUI(); // CALL THE MISSING FUNCTION HERE

    if (allRecipes.length > 0) {
        if (recipeCarousel) {
            const featuredIds = [9, 6, 5, 16]; 
            const featuredRecipes = allRecipes.filter(r => featuredIds.includes(r.id));
            recipeCarousel.innerHTML = featuredRecipes.map(buildCardHTML).join('');
        }

        if (timelessCarousel) {
            const classicIds = [1, 13, 12, 18];
            const classicRecipes = allRecipes.filter(r => classicIds.includes(r.id));
            timelessCarousel.innerHTML = classicRecipes.map(buildCardHTML).join('');
        }
        
        attachHeartLogic();
        attachCarouselLogic();
    }

    // --- LOGIC FUNCTIONS ---

    // THE MISSING FUNCTION
    function updateAuthUI() {
        const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : JSON.parse(localStorage.getItem('currentUser')); 
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        if (currentUser) {
            authContainer.innerHTML = `
                <a href="pages/user_pages/profile.html" class="auth-link" style="display: flex; align-items: center; gap: 8px;">
                    <span class="user-name">${currentUser.name}</span>
                    <span style="font-size: 18px;">👤</span>
                </a>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="auth-link">Login</a>
                <span class="auth-separator">/</span>
                <a href="signup.html" class="auth-link">Signup</a>
            `;
        }
    }

    function attachHeartLogic() {
        document.querySelectorAll('.heart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeId = parseInt(btn.getAttribute('data-id'));
                let favs = getFavourites();
                const svg = btn.querySelector('svg');

                if (favs.includes(recipeId)) {
                    favs = favs.filter(id => id !== recipeId);
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                } else {
                    favs.push(recipeId);
                    svg.setAttribute('fill', '#d4af37');
                    svg.setAttribute('stroke', '#d4af37');
                }
                saveFavourites(favs);
            });
        });
    }

    function attachCarouselLogic() {
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            let isDown = false, startX, scrollLeft;
            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                carousel.style.cursor = 'grabbing';
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            carousel.addEventListener('mouseleave', () => { isDown = false; carousel.style.cursor = 'pointer'; });
            carousel.addEventListener('mouseup', () => { isDown = false; carousel.style.cursor = 'pointer'; });
            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
        });
    }
});
