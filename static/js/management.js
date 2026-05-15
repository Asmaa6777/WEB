// Get CSRF token for AJAX requests
function getCsrfToken() {
    let name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// DELETE USER
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = `/management/users/${userId}/delete/`;
        let csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = getCsrfToken();
        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
    }
}

// TOGGLE STAFF
function toggleStaff(userId, currentStatus) {
    let action = currentStatus ? 'Remove staff access' : 'Make staff member';
    if (confirm(`Are you sure you want to ${action}?`)) {
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = `/management/users/${userId}/toggle-staff/`;
        let csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = getCsrfToken();
        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
    }
}

// TOGGLE USER STATUS
function toggleUserStatus(userId, isActive) {
    let action = isActive ? 'deactivate' : 'activate';
    let message = isActive ? 'Deactivate this user account?' : 'Activate this user account?';
    if (confirm(message)) {
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = `/management/users/${userId}/deactivate/`;
        let csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = getCsrfToken();
        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
    }
}