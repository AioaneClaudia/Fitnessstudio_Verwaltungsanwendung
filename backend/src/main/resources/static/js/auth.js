function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function requireAuth() {
    if (!getUser()) window.location.href = 'login.html';
}

function requireRole(...roluri) {
    const user = getUser();
    if (!user) window.location.href = 'login.html';
    if (!roluri.includes(user.rol)) {
        alert('Nu ai acces la această pagină!');
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function renderNavbar() {
    const user = getUser();
    if (!user) return;
    const el = document.getElementById('user-info');
    if (el) el.textContent = `${user.nume} (${user.rol})`;
}