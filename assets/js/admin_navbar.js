class AdminNavbar extends HTMLElement {
    connectedCallback() {
        // 1. Check who is logged in so we can display their name
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // 2. Render the Admin Navbar
        this.innerHTML = `
            <header class="main-header">
                <div class="logo">
                    <span class="logo-icon">R</span>
                    <span class="logo-text">Recipe<span class="logo-highlight">Admin</span></span>
                </div>
                
                <nav class="main-nav">
                    <div class="nav-links">
                        <a href="/pages/admin_pages/admin_dashboard.html">Dashboard</a>
                        <a href="/pages/admin_pages/add_recipe.html">Add Recipe</a>
                        <a href="/pages/admin_pages/manage_recipes.html">Manage Recipes</a>
                        <a href="/pages/admin_pages/manage_users.html">Users</a>
                    </div>

                    <div class="nav-actions">
                        <div id="auth-container" style="display: flex; align-items: center; gap: 15px;">
                            <span style="color: var(--text-muted); font-size: 15px;">
                                Welcome, <span style="color: var(--gold);">${currentUser ? currentUser.name : 'Admin'}</span>
                            </span>
                            <button id="adminLogoutBtn" style="background: transparent; color: var(--text-muted); border: 1px solid var(--border); padding: 6px 14px; border-radius: 6px; cursor: pointer; transition: all 0.3s;">Logout</button>
                        </div>
                    </div>
                </nav>
            </header>
        `;

        // 3. Attach Logout Logic
        const logoutBtn = this.querySelector('#adminLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                // Kick them back to the login page when they log out
                window.location.href = '/pages/login.html'; 
            });
        }
    }
}

customElements.define('admin-navbar', AdminNavbar);