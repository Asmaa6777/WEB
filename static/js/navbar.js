class MainNavbar extends HTMLElement {
  connectedCallback() {
    const user = window.DJANGO_USER;

    // Nav links depend on role
    let navLinks = '';
    if (user && user.isStaff) {
      navLinks = `
        <a href="/">Home</a>
        <a href="/management/dashboard/">Dashboard</a>
        <a href="/recipes/">All Recipes</a>
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

    // Auth section
    let authHTML = '';
    if (user) {
      authHTML = `
        <div class="profile-dropdown">
          <button class="profile-btn">
            ${user.name} <span class="arrow">▾</span>
          </button>
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
            <div id="auth-container">${authHTML}</div>
          </div>
        </nav>
      </header>
    `;

    // Highlight active link
    const currentPath = window.location.pathname;
    this.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath === href || (href !== '/' && currentPath.startsWith(href))) {
        link.classList.add('active');
      }
    });

    // Profile dropdown toggle
    const profileBtn = this.querySelector('.profile-btn');
    const dropdownMenu = this.querySelector('.dropdown-menu');
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('open');
      });
      document.addEventListener('click', () => dropdownMenu.classList.remove('open'));
    }
  }
}

customElements.define('main-navbar', MainNavbar);
