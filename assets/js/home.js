document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Bar Auth Toggle (DYNAMIC LOGIC) ---
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : JSON.parse(localStorage.getItem('currentUser')); 
    const authContainer = document.getElementById('auth-container');
    
    if (authContainer) {
        if (currentUser) {
            authContainer.innerHTML = `
                <a href="user_pages/profile.html" style="display: flex; align-items: center; gap: 8px; color: var(--text-muted); transition: color 0.3s; text-decoration: none;">
                    <span class="user-name">${currentUser.name}</span>
                    <span style="font-size: 18px; margin-left: 5px;">👤</span>
                </a>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" style="color: var(--text-muted); text-decoration: none; transition: color 0.3s;">Login</a>
                <span style="color: var(--border);">/</span>
                <a href="signup.html" style="color: var(--text-muted); text-decoration: none; transition: color 0.3s;">Signup</a>
            `;
        }
    }

    // --- DYNAMICALLY LOAD RECIPES FOR CAROUSELS ---
    const recipeCarousel = document.getElementById('recipeCarousel');
    const timelessCarousel = document.getElementById('timelessCarousel');

    // 1. FIXED PATH: Added ../ so it steps out of the pages folder!
    fetch('../assets/data_files/recipes.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not find recipes.json");
            return response.json();
        })
        .then(allRecipes => {
            
            let savedFavorites = typeof getFavourites === 'function' ? getFavourites() : JSON.parse(localStorage.getItem('favourites')) || [];

            function buildCardHTML(recipe) {
                const isFavorited = savedFavorites.includes(recipe.id);
                const badgeText = recipe.course ? recipe.course.replace('-', ' ').toUpperCase() : 'RECIPE';
                const heartClass = isFavorited ? 'heart-btn active' : 'heart-btn';
                const fill = isFavorited ? '#d4af37' : 'none';
                const stroke = isFavorited ? '#d4af37' : 'currentColor';
                
                // 2. FIXED IMAGE PATH: Your JSON paths are already correct!
                const correctImagePath = recipe.image;

                return `
                    <div class="recipe-card">
                        <div class="card-image-wrapper">
                            <span class="badge">${badgeText}</span>
                            <button class="${heartClass}" data-id="${recipe.id}" aria-label="Favorite">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </button>
                            <img src="${correctImagePath}" alt="${recipe.name}">
                        </div>
                        <div class="card-content">
                            <h3>${recipe.name}</h3>
                            <p>${recipe.description}</p>
                            <a href="user_pages/recipe_detail.html?id=${recipe.id}" class="view-recipe">View Recipe &rarr;</a>
                        </div>
                    </div>
                `;
            }

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
        })
        .catch(err => {
            console.error("Error fetching recipes for homepage:", err);
            if (recipeCarousel) recipeCarousel.innerHTML = '<p style="color:red; padding: 20px;">Error loading recipes. Check F12 Console!</p>';
        });


    // --- Heart Icon Toggle & Save Logic ---
    function attachHeartLogic() {
        const heartButtons = document.querySelectorAll('.heart-btn');
        
        heartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation();

                const recipeId = parseInt(btn.getAttribute('data-id'));
                const svg = btn.querySelector('svg');
                let currentFavs = typeof getFavourites === 'function' ? getFavourites() : JSON.parse(localStorage.getItem('favourites')) || [];
                
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                    currentFavs = currentFavs.filter(id => id !== recipeId);
                } else {
                    btn.classList.add('active');
                    svg.setAttribute('fill', '#d4af37'); 
                    svg.setAttribute('stroke', '#d4af37'); 
                    if (!currentFavs.includes(recipeId) && !isNaN(recipeId)) {
                        currentFavs.push(recipeId);
                    }
                }
                
                if (typeof saveFavourites === 'function') {
                    saveFavourites(currentFavs);
                } else {
                    localStorage.setItem('favourites', JSON.stringify(currentFavs));
                }
            });
        });
    }

    // --- Carousel Drag to Scroll ---
    function attachCarouselLogic() {
        const carousels = document.querySelectorAll('.carousel-container');
        
        carousels.forEach(carousel => {
            let isDown = false;
            let startX;
            let scrollLeft;

            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                carousel.style.cursor = 'grabbing';
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('mouseleave', () => {
                isDown = false;
                carousel.style.cursor = 'pointer';
            });

            carousel.addEventListener('mouseup', () => {
                isDown = false;
                carousel.style.cursor = 'pointer';
            });

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