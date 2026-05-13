class MainNavbar extends HTMLElement {
  connectedCallback() {

    // Get user info from the element's data attributes
    // Set these in your base/dashboard template on the <main-navbar> tag:
    // <main-navbar data-user="{{ request.user.email }}" data-role="{% if request.user.is_staff %}admin{% else %}user{% endif %}" data-authenticated="{{ request.user.is_authenticated|yesno:'true,false' }}"></main-navbar>

    const isAuthenticated = this.dataset.authenticated === 'true';
    const userEmail = this.dataset.user || '';
    const userRole = this.dataset.role || 'user';
    const isAdmin = userRole === 'admin';

    // Build nav links
    let navLinks = '';
    if (isAdmin) {
      navLinks = `
        <a href="/">Home</a>
        <a href="/management/dashboard/">Dashboard</a>
        <a href="/recipes/">All Recipes</a>
        <a href="/recipes/trending/">Trending</a>
        <a href="/recipes/add/">Add Recipe</a>
      `;
    } else {
      navLinks = `
        <a href="/">Home</a>
        <a href="/recipes/">Recipes</a>
        <a href="/recipes/trending/">Trending</a>
        <a href="/recipes/favourites/">Favourites</a>
      `;
    }

    // Build auth section
    let authHTML = '';
    if (isAuthenticated) {
      const profileLink = isAdmin ? '/accounts/profile/' : '/accounts/profile/';
      const initial = userEmail ? userEmail[0].toUpperCase() : 'U';

      authHTML = `
        <div class="profile-dropdown">
          <a class="profile-link" href="#">
            <span class="profile-avatar">${initial}</span>
            <span style="color: var(--text-muted); font-size:14px;">${userEmail}</span>
            <span style="color: var(--text-muted);">▾</span>
          </a>
          <div class="dropdown-menu">
            <a href="${profileLink}">My Profile</a>
            <a href="/accounts/logout/" id="logoutBtn">Logout</a>
          </div>
        </div>
      `;
    } else {
      authHTML = `
        <a href="/accounts/login/" class="nav-login-link">Login / Signup</a>
      `;
    }

    // Render full navbar
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
            <a href="/recipes/search/" class="search-btn" aria-label="Search">
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

    // Highlight active link
    const currentPath = window.location.pathname;
    this.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });

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