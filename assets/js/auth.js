// assets/js/auth.js
// Note: data.js must be loaded before this file on login.html and signup.html

// ── SIGNUP ──────────────────────────────────────────────────────
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const selectedRole = document.querySelector('input[name="role"]:checked');
    const role = selectedRole ? selectedRole.value : 'user';
    const formMessage = document.getElementById('formMessage');

    if (formMessage) formMessage.textContent = '';

    // Validate
    if (!firstName || !lastName || !dob || !username || !email || !password || !confirmPassword) {
      if (formMessage) formMessage.textContent = 'Please fill in all required fields.';
      return;
    }

    if (password.length < 8) {
      if (formMessage) formMessage.textContent = 'Password must be at least 8 characters.';
      return;
    }

    if (password !== confirmPassword) {
      if (formMessage) formMessage.textContent = 'Passwords do not match.';
      return;
    }

    if (!email.includes('@')) {
      if (formMessage) formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    // Check for existing user — uses getUsers() from data.js
    const users = getUsers();
    const existingUser = users.find(u =>
      u.username.toLowerCase() === username.toLowerCase() ||
      u.email === email
    );

    if (existingUser) {
      if (formMessage) formMessage.textContent = 'Username or email already exists.';
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      dob,
      username,
      email,
      password,
      role
    };

    // Save using saveUsers() from data.js — uses "users" key
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    if (formMessage) {
      formMessage.textContent = 'Account created successfully. Redirecting...';
      formMessage.style.color = 'green';
    }

    signupForm.reset();

    setTimeout(() => {
      if (role === 'admin') {
        window.location.href = 'admin_pages/admin_dashboard.html';
      } else {
        window.location.href = 'homepage.html';
      }
    }, 1000);
  });
}

// ── LOGIN ────────────────────────────────────────────────────────
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const identifier = document.getElementById('loginIdentifier').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (formMessage) formMessage.textContent = '';

    if (!identifier || !password) {
      if (formMessage) formMessage.textContent = 'Please enter your username/email and password.';
      return;
    }

    // Uses getUsers() from data.js — reads from "users" key
    const users = getUsers();

    const foundUser = users.find(u =>
      (u.username.toLowerCase() === identifier || u.email === identifier) &&
      u.password === password
    );

    if (!foundUser) {
      if (formMessage) {
        formMessage.textContent = 'Invalid username/email or password.';
        formMessage.style.color = 'red';
      }
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    if (foundUser.role === 'admin') {
      window.location.href = 'admin_pages/admin_dashboard.html';
    } else {
      window.location.href = 'homepage.html';
    }
  });
}