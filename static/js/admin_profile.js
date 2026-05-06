// assets/js/profile.js

document.addEventListener('DOMContentLoaded', () => {

  const currentUser = getCurrentUser();

  // Redirect if not logged in
  if (!currentUser) {
    window.location.href = '../login.html';
    return;
  }

  // ── Build display name ──────────────────────────────────────────
  const displayName = currentUser.name ||
    `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() ||
    'User';

  // ── Populate display fields ─────────────────────────────────────
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileUsernameText = document.getElementById('profileUsernameText');
  const profileEmail = document.getElementById('profileEmail');
  const profileRole = document.getElementById('profileRole');
  const profileDob = document.getElementById('profileDob');

  if (profileAvatar) {
    profileAvatar.src = '../../assets/images/placeholder.svg';
    profileAvatar.alt = `${displayName} avatar`;
  }
  if (profileName) profileName.textContent = displayName;
  if (profileUsernameText) profileUsernameText.textContent = currentUser.username || 'N/A';
  if (profileEmail) profileEmail.textContent = currentUser.email || 'N/A';
  if (profileRole) profileRole.textContent = currentUser.role || 'N/A';
  if (profileDob) profileDob.textContent = currentUser.dob || 'N/A';

  // ── Pre-fill edit form ──────────────────────────────────────────
  const profileUsername = document.getElementById('profileUsername');
  const emailInput = document.getElementById('emailInput');
  const dobInput = document.getElementById('dobInput');
  const passwordInput = document.getElementById('passwordInput');
  const profileMessage = document.getElementById('profileMessage');
  const profileForm = document.getElementById('profileForm');

  if (profileUsername) profileUsername.value = currentUser.username || '';
  if (emailInput) emailInput.value = currentUser.email || '';
  if (dobInput) dobInput.value = currentUser.dob || '';

  if (!profileForm) return;

  // ── Handle form submit ──────────────────────────────────────────
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedUsername = profileUsername ? profileUsername.value.trim() : '';
    const updatedEmail = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const updatedDob = dobInput ? dobInput.value : '';
    const updatedPassword = passwordInput ? passwordInput.value : '';

    // Validate
    if (!updatedUsername) {
      profileMessage.textContent = 'Username is required.';
      profileMessage.style.color = 'red';
      return;
    }

    if (!updatedEmail) {
      profileMessage.textContent = 'Email is required.';
      profileMessage.style.color = 'red';
      return;
    }

    if (!updatedEmail.includes('@')) {
      profileMessage.textContent = 'Please enter a valid email.';
      profileMessage.style.color = 'red';
      return;
    }

    if (updatedPassword && updatedPassword.length < 8) {
      profileMessage.textContent = 'Password must be at least 8 characters.';
      profileMessage.style.color = 'red';
      return;
    }

    // Check for duplicate username or email
    const users = getUsers();
    const duplicate = users.find(u =>
      u.id !== currentUser.id &&
      (u.username === updatedUsername || u.email === updatedEmail)
    );

    if (duplicate) {
      profileMessage.textContent = 'That username or email is already taken.';
      profileMessage.style.color = 'red';
      return;
    }

    // Update user object
    currentUser.username = updatedUsername;
    currentUser.email = updatedEmail;
    currentUser.dob = updatedDob;
    if (updatedPassword) {
      currentUser.password = updatedPassword;
    }

    // Save back to users array by ID only
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      saveUsers(users);
    }

    // Update currentUser in localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update display fields
    if (profileUsernameText) profileUsernameText.textContent = currentUser.username;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profileDob) profileDob.textContent = currentUser.dob || 'N/A';
    if (profileName) profileName.textContent = currentUser.name || currentUser.username;

    profileMessage.textContent = 'Profile updated successfully!';
    profileMessage.style.color = 'green';

    if (passwordInput) passwordInput.value = '';
  });

});