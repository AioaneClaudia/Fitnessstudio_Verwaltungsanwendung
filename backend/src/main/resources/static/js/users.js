requireRole('admin');

const API = 'http://localhost:8080/api/users';

async function loadUsers() {
    const res = await fetch(API);
    const users = await res.json();

    const tbody = document.getElementById('tabel-users');
    const count = document.getElementById('count-users');
    tbody.innerHTML = '';
    if (count) count.textContent = `${users.length} utilizatori`;

    users.forEach(u => {
        const badgeClass = u.rol === 'admin' ? 'badge-danger' :
                           u.rol === 'trainer' ? 'badge-info' : 'badge-secondary';

        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nume}</td>
                <td>${u.email}</td>
                <td><span class="badge ${badgeClass}">${u.rol}</span></td>
                <td>
                    <select class="form-select" id="rol-${u.id}" style="width:120px;padding:5px 8px;font-size:12px">
                        <option value="membru" ${u.rol === 'membru' ? 'selected' : ''}>Membru</option>
                        <option value="trainer" ${u.rol === 'trainer' ? 'selected' : ''}>Trainer</option>
                        <option value="admin" ${u.rol === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </td>
                <td style="display:flex;gap:6px">
                    <button class="btn btn-primary btn-sm" onclick="schimbaRol(${u.id})">
                        <i class="ti ti-check"></i> Salvează
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="stergeUser(${u.id})">
                        <i class="ti ti-trash"></i>
                    </button>
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