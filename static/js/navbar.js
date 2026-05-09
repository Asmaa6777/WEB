class MainNavbar extends HTMLElement {
  connectedCallback() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Use absolute paths for Django URLs
    const base = ''; 

    // Build nav links based on role
    let navLinks = '';

    if (currentUser && currentUser.role === 'admin') {
      navLinks = `
        <a href="/">Home</a>
        <a href="/management/">Dashboard</a>
        <a href="/recipes/">All Recipes</a>
        <a href="/social/trending/">Trending</a>
        <a href="/management/add-recipe/">Add Recipe</a>
      `;
    } else {
      navLinks = `
        <a href="/">Home</a>
        <a href="/recipes/">Recipes</a>
        <a href="/social/trending/">Trending</a>
        <a href="/social/favorites/">Favourites</a>
      `;
    }

    // Build auth section
    let authHTML = '';
    if (currentUser) {
      const profileLink = currentUser.role === 'admin'
        ? `/management/profile/`
        : `/accounts/profile/`;

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
        <a href="/accounts/login/" class="nav-login-link">Login / Signup</a>
      `;
    }

    // Build full navbar
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

    // Highlight active page
    const currentPath = window.location.pathname;
    const links = this.querySelectorAll('.nav-links a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath === href || (href !== '/' && currentPath.startsWith(href))) {
        link.classList.add('active');
      }
    });

    // Logout
    const logoutBtn = this.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = `/accounts/login/`;
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
