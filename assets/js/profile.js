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
  const emailInput = document.getElementById('emailInput');
  const dobInput = document.getElementById('dobInput');
  const passwordInput = document.getElementById('passwordInput');

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
  if (emailInput) emailInput.value = currentUser.email || '';
  if (dobInput) dobInput.value = currentUser.dob || '';

  if (!profileForm) return;

  profileForm.addEventListener('submit', event => {
    event.preventDefault();

    const updatedUsername = profileUsername.value.trim();
    const updatedEmail = emailInput.value.trim().toLowerCase();
    const updatedDob = dobInput.value;
    const updatedPassword = passwordInput.value;

    if (!updatedUsername || !updatedEmail) {
      profileMessage.textContent = 'Username and email are required.';
      profileMessage.style.color = 'red';
      return;
    }

    const users = getUsers();
    const duplicate = users.find(user =>
      user.id !== currentUser.id && (user.username === updatedUsername || user.email === updatedEmail)
    );

    if (duplicate) {
      profileMessage.textContent = 'That username or email is already taken.';
      profileMessage.style.color = 'red';
      return;
    }

    currentUser.username = updatedUsername;
    currentUser.email = updatedEmail;
    currentUser.dob = updatedDob;
    if (updatedPassword) {
      currentUser.password = updatedPassword;
    }

    const userIndex = users.findIndex(user => user.id === currentUser.id);
    if (userIndex >= 0) {
      users[userIndex] = currentUser;
      saveUsers(users);
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if (profileUsernameText) profileUsernameText.textContent = currentUser.username;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profileDob) profileDob.textContent = currentUser.dob || 'N/A';

    profileMessage.textContent = 'Profile updated successfully.';
    profileMessage.style.color = 'green';
    passwordInput.value = '';
  });
});
