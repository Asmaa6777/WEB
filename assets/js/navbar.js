class MainNavbar extends HTMLElement {
    connectedCallback() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const inUserPages = window.location.pathname.includes('/pages/user_pages/');
        const basePath = inUserPages ? '..' : '.';

        let authHTML = '';

        if (currentUser) {
            authHTML = `
                <div class="profile-dropdown">
                    <a href="#" class="profile-link">
                        <span>${currentUser.name}</span>
                        <div class="profile-avatar">U</div>
                    </a>
                    <div class="dropdown-menu">
                        <a href="${basePath}/user_pages/profile.html">My Profile</a>
                        <a href="#" id="logoutBtn" style="color: #ff6b6b;">Logout</a>
                    </div>
                </div>
            `;
        } else {
            authHTML = `
                <a href="${basePath}/login.html" class="login-link">Login / Signup</a>
            `;
        }

        this.innerHTML = `
            <header class="main-header">
                <a href="${basePath}/homepage.html" class="logo" aria-label="Recipe Finder home">
                    <span class="logo-icon">R</span>
                    <span class="logo-text">Recipe<span class="logo-highlight">Finder</span></span>
                </a>

                <nav class="main-nav">
                    <div class="nav-links">
                        <a href="${basePath}/homepage.html">Home</a>
                        <a href="${basePath}/user_pages/recipes.html">Recipes</a>
                        <a href="${basePath}/trending.html">Trending</a>
                        <a href="${basePath}/user_pages/favorites.html">Favorites</a>
                    </div>

                    <div class="nav-actions">
                        <a href="${basePath}/user_pages/search-results.html" class="search-btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </a>

                        <div id="auth-container">
                            ${authHTML}
                        </div>
                    </div>
                </nav>
            </header>
        `;

        const logoutBtn = this.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = `${basePath}/login.html`;
            });
        }

        const currentPage = window.location.pathname.split('/').pop();
        const links = this.querySelectorAll('.nav-links a');

        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (currentPage === linkPage) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('main-navbar', MainNavbar);
