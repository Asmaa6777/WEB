class MainNavbar extends HTMLElement {
    connectedCallback() {
        // 1. Check if a user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // 2. Define the Auth Section HTML
        let authHTML = '';

        if (currentUser) {
            // If logged in: Show Profile Icon with Dropdown
            authHTML = `
                <div class="profile-dropdown">
                    <a href="#" class="profile-link">
                        <span>${currentUser.name}</span>
                        <div class="profile-avatar">👤</div>
                    </a>
                    <div class="dropdown-menu">
                        <a href="/pages/user_pages/profile.html">My Profile</a>
                        <a href="#" id="logoutBtn" style="color: #ff6b6b;">Logout</a>
                    </div>
                </div>
            `;
        } else {
            // If NOT logged in: Show Login / Signup
            authHTML = `
                <a href="/pages/user_pages/login.html" class="login-link">Login / Signup</a>
            `;
        }

        // 3. Set the full InnerHTML
        this.innerHTML = `
            <header class="main-header">
                <div class="logo">
                    <span class="logo-icon">R</span>
                    <span class="logo-text">Recipe<span class="logo-highlight">Finder</span></span>
                </div>
                
                <nav class="main-nav">
                    <div class="nav-links">
                        <a href="/pages/homepage.html">Home</a>
                        <a href="/pages/user_pages/recipes.html">Recipes</a>
                        <a href="/pages/user_pages/trending.html">Trending</a>
                        <a href="/pages/user_pages/favorites.html">Favorites</a>
                    </div>

                    <div class="nav-actions">
                        <a href="/pages/user_pages/search_results.html" class="search-btn" aria-label="Search">
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

        // 4. Attach Logout Logic
        const logoutBtn = this.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = '/pages/user_pages/login.html';
            });
        }

        // 5. Active Link Logic (Highlights current page)
        const links = this.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (window.location.pathname.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('main-navbar', MainNavbar);