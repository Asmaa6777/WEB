class MainNavbar extends HTMLElement {
  connectedCallback() {
    const isAuthenticated = this.dataset.authenticated === 'true';
    const userEmail = this.dataset.user || '';
    const userRole = this.dataset.role || 'user';
    const isAdmin = userRole === 'admin';

    let navLinks = '';
    if (isAdmin) {
      navLinks = `
        <a href="/">Home</a>
        <a href="/management/dashboard/">Dashboard</a>
        <a href="/recipes/">All Recipes</a>
        <a href="/management/recipes/">Manage Recipes</a>
        <a href="/management/recipes/new/">Add Recipe</a>
        <a href="/management/users/">Manage Users</a>
        <a href="/social/trending/">Trending</a>
      `;
    } else {
      navLinks = `
        <a href="/">Home</a>
        <a href="/recipes/">Recipes</a>
        <a href="/social/trending/">Trending</a>
        <a href="/social/favorites/">Favourites</a>
      `;
    }

    let authHTML = '';
    if (isAuthenticated) {
      const initial = userEmail ? userEmail[0].toUpperCase() : 'U';

      authHTML = `
        <div class="profile-dropdown">
          <a class="profile-link" href="#">
            <span class="profile-avatar">${initial}</span>
            <span style="color: var(--text-muted); font-size:14px;">${userEmail}</span>
            <span style="color: var(--text-muted);">▾</span>
          </a>
          <div class="dropdown-menu">
            <a href="/accounts/profile/">My Profile</a>
            <a href="/accounts/logout/" id="logoutBtn">Logout</a>
          </div>
        </div>
      `;
    } else {
      authHTML = `
        <a href="/accounts/login/" class="nav-login-link">Login / Signup</a>
      `;
    }

    this.innerHTML = `
      <header class="main-header">
        <a href="/" class="logo">
          <span class="logo-icon">R</span>
          <span class="logo-text">Recipe<span class="logo-highlight">Finder</span></span>
        </a>

        <nav class="main-nav">
          <div class="nav-links">
            ${navLinks}
          </div>
          <div class="nav-actions">
            <a href="/search/" class="search-btn" aria-label="Search">
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

    // Highlight the single best-matching nav link.
    // Exact match wins outright; otherwise the longest prefix match wins.
    // This prevents /management/recipes/ and /management/recipes/new/ both
    // being highlighted when the user is on the "Add Recipe" page.
    const currentPath = window.location.pathname;
    const links = [...this.querySelectorAll('.nav-links a')];
    let bestLink = null;
    let bestScore = -1;
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath === href) {
        // Exact match — score beyond any prefix length
        if (href.length + 1000 > bestScore) {
          bestScore = href.length + 1000;
          bestLink = link;
        }
      } else if (href !== '/' && currentPath.startsWith(href)) {
        if (href.length > bestScore) {
          bestScore = href.length;
          bestLink = link;
        }
      }
    });
    if (bestLink) bestLink.classList.add('active');

    // Profile dropdown toggle
    const profileLink = this.querySelector('.profile-link');
    const dropdownMenu = this.querySelector('.dropdown-menu');
    if (profileLink && dropdownMenu) {
      profileLink.addEventListener('click', (e) => {
        e.preventDefault();
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
