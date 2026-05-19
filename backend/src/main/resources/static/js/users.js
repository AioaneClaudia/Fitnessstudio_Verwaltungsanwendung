requireRole('admin');
renderNavbar();

const API = 'http://localhost:8080/api/users';

async function loadUsers() {
    const res = await fetch(API);
    const users = await res.json();

    const tbody = document.getElementById('tabel-users');
    tbody.innerHTML = '';

    users.forEach(u => {
        const badgeColor = u.rol === 'admin' ? 'bg-danger' :
                           u.rol === 'trainer' ? 'bg-primary' : 'bg-secondary';

        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nume}</td>
                <td>${u.email}</td>
                <td><span class="badge ${badgeColor}">${u.rol}</span></td>
                <td>
                    <select class="form-select form-select-sm" id="rol-${u.id}">
                        <option value="membru" ${u.rol === 'membru' ? 'selected' : ''}>Membru</option>
                        <option value="trainer" ${u.rol === 'trainer' ? 'selected' : ''}>Trainer</option>
                        <option value="admin" ${u.rol === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-primary btn-sm me-1" onclick="schimbaRol(${u.id})">Salvează</button>
                    <button class="btn btn-danger btn-sm" onclick="stergeUser(${u.id})">Șterge</button>
                </td>
            </tr>
        `;
    });
}

async function schimbaRol(id) {
    const rol = document.getElementById(`rol-${id}`).value;

    await fetch(`${API}/${id}/rol`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol })
    });

    loadUsers();
}

async function stergeUser(id) {
    if (!confirm('Sigur vrei să ștergi acest utilizator?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadUsers();
}

loadUsers();