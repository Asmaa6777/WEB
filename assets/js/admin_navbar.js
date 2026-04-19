class AdminNavbar extends HTMLElement {
    connectedCallback() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentPage = window.location.pathname.split('/').pop();

        this.innerHTML = `
            <header class="main-header">
                <div class="logo">
                    <span class="logo-icon">R</span>
                    <span class="logo-text">Recipe<span class="logo-highlight">Admin</span></span>
                </div>

                <nav class="main-nav">
                    <div class="nav-links">
                        <a href="recipes.html">Recipes</a>
                        <a href="admin_dashboard.html">Dashboard</a>
                        <a href="profile.html">Profile</a>
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

        const logoutBtn = this.querySelector('#adminLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.href = '../login.html';
            });
        }

        const links = this.querySelectorAll('.nav-links a');
        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (currentPage === linkPage) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('admin-navbar', AdminNavbar);
