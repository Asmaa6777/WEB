class MainNavbar extends HTMLElement {
  connectedCallback() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Detect folder depth for correct paths
    const path = window.location.pathname;
    const inUserPages = path.includes('/user_pages/');
    const inAdminPages = path.includes('/admin_pages/');
    const inSubPages = inUserPages || inAdminPages;
    const base = inSubPages ? '..' : '.';

    // Build nav links based on role
    let navLinks = '';

    if (currentUser && currentUser.role === 'admin') {
      navLinks = `
        <a href="${base}/homepage.html">Home</a>
        <a href="${base}/admin_pages/admin_dashboard.html">Dashboard</a>
        <a href="${base}/admin_pages/recipes.html">All Recipes</a>
        <a href="${base}/trending.html">Trending</a>
        <a href="${base}/admin_pages/add_recipe.html">Add Recipe</a>
      `;
    } else {
      navLinks = `
        <a href="${base}/homepage.html">Home</a>
        <a href="${base}/user_pages/recipes.html">Recipes</a>
        <a href="${base}/trending.html">Trending</a>
        <a href="${base}/user_pages/favorites.html">Favourites</a>
      `;
    }

    // Build auth section
    let authHTML = '';
    if (currentUser) {
      const profileLink = currentUser.role === 'admin'
        ? `${base}/admin_pages/profile.html`
        : `${base}/user_pages/profile.html`;

      authHTML = `
        <div class="profile-dropdown">
          <button class="profile-btn">
            ${currentUser.name} <span class="arrow">▾</span>
          </button>
          <div class="dropdown-menu">
            <a href="${profileLink}">My Profile</a>
            <a href="#" id="logoutBtn">Logout</a>
          </div>
        </div>
      `;
    } else {
      authHTML = `
        <a href="${base}/login.html" class="nav-login-link">Login / Signup</a>
      `;
    }

    // Build full navbar
    this.innerHTML = `
      <header class="main-header">
        <a href="${base}/homepage.html" class="logo">
          <span class="logo-icon">R</span>
          <span class="logo-text">Recipe<span class="logo-highlight">Finder</span></span>
        </a>

        <nav class="main-nav">
          <div class="nav-links">
            ${navLinks}
          </div>

          <div class="nav-actions">
            <a href="${base}/user_pages/search-results.html" class="search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </a>
            <div id="auth-container">${authHTML}</div>
          </div>
        </nav>
      </header>
    `;

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop();
    const links = this.querySelectorAll('.nav-links a');
    links.forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (currentPage === linkPage) {
        link.classList.add('active');
      }
    });

    // Logout
    const logoutBtn = this.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = `${base}/login.html`;
      });
    }

    // Profile dropdown toggle
    const profileBtn = this.querySelector('.profile-btn');
    const dropdownMenu = this.querySelector('.dropdown-menu');
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('open');
      });

      document.addEventListener('click', () => {
        dropdownMenu.classList.remove('open');
      });
    }
  }
}

customElements.define('main-navbar', MainNavbar);