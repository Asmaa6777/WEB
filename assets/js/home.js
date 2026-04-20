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

   
    const allRecipes = getRecipes();
   const featuredIds = [9, 6, 5, 16];
   const featuredRecipes = allRecipes.filter(r => featuredIds.includes(r.id));
if (recipeCarousel) {
  recipeCarousel.innerHTML = featuredRecipes.map(buildCardHTML).join('');
}
         
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