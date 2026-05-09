document.addEventListener('DOMContentLoaded', () => {
    
    // We no longer build cards in JS as Django handles rendering.
    // We only keep the interactivity (Heart logic, Carousel scrolling, Auth UI).

    // 1. INITIALIZE PAGE
    updateAuthUI();
    attachHeartLogic();
    attachCarouselLogic();

    // --- LOGIC FUNCTIONS ---

    function updateAuthUI() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        if (currentUser) {
            authContainer.innerHTML = `
                <a href="/accounts/profile/" class="auth-link" style="display: flex; align-items: center; gap: 8px;">
                    <span class="user-name">${currentUser.name}</span>
                    <span style="font-size: 18px;">👤</span>
                </a>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="/accounts/login/" class="auth-link">Login</a>
                <span class="auth-separator">/</span>
                <a href="/accounts/signup/" class="auth-link">Signup</a>
            `;
        }
    }

    function attachHeartLogic() {
        document.querySelectorAll('.heart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeId = parseInt(btn.getAttribute('data-id'));
                let favs = JSON.parse(localStorage.getItem('favourites')) || [];
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
                localStorage.setItem('favourites', JSON.stringify(favs));
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
