document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  const loginPage = '../login.html';

  if (!currentUser) {
    window.location.href = loginPage;
    return;
  }

  const displayName = currentUser.name || `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileRole = document.getElementById('profileRole');
  const profileDob = document.getElementById('profileDob');
  const profileUsernameText = document.getElementById('profileUsernameText');
  const profileUsername = document.getElementById('profileUsername');
  const profileMessage = document.getElementById('profileMessage');
  const profileForm = document.getElementById('profileForm');

  if (profileAvatar) {
    profileAvatar.src = '../../assets/images/placeholder.svg';
    profileAvatar.alt = `${displayName} profile avatar`;
  }

  if (profileName) profileName.textContent = displayName || 'N/A';
  if (profileUsernameText) profileUsernameText.textContent = currentUser.username || 'N/A';
  if (profileEmail) profileEmail.textContent = currentUser.email || 'N/A';
  if (profileRole) profileRole.textContent = currentUser.role || 'N/A';
  if (profileDob) profileDob.textContent = currentUser.dob || 'N/A';

  if (profileUsername) profileUsername.value = currentUser.username || '';
  if (document.getElementById('emailInput')) document.getElementById('emailInput').value = currentUser.email || '';
  if (document.getElementById('dobInput')) document.getElementById('dobInput').value = currentUser.dob || '';

  const logoutLinks = document.querySelectorAll('.nav-logout');
  logoutLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = loginPage;
    });
  });

  if (!profileForm) return;

  profileForm.addEventListener('submit', event => {
    event.preventDefault();

    const updatedUsername = profileUsername.value.trim();
    const updatedEmail = document.getElementById('emailInput').value.trim().toLowerCase();
    const updatedPassword = document.getElementById('passwordInput').value;

    if (!updatedUsername || !updatedEmail) {
      profileMessage.textContent = 'Username and email are required.';
      profileMessage.style.color = 'red';
      return;
    }

    const users = getUsers();
    const duplicate = users.find(u => u.id !== currentUser.id && (u.username === updatedUsername || u.email === updatedEmail));
    if (duplicate) {
      profileMessage.textContent = 'That username or email is already taken.';
      profileMessage.style.color = 'red';
      return;
    }

    currentUser.username = updatedUsername;
    currentUser.email = updatedEmail;
    if (updatedPassword) {
      currentUser.password = updatedPassword;
    }

    const userIndex = users.findIndex(u => u.id === currentUser.id || u.username === currentUser.username || u.email === currentUser.email);
    if (userIndex >= 0) {
      users[userIndex] = currentUser;
      saveUsers(users);
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if (profileUsernameText) profileUsernameText.textContent = currentUser.username;
    if (profileEmail) profileEmail.textContent = currentUser.email;

    profileMessage.textContent = 'Profile updated successfully.';
    profileMessage.style.color = 'green';
    document.getElementById('passwordInput').value = '';
  });
