if (!localStorage.getItem('user')) window.location.href = 'login.html';

const API = 'http://localhost:8080/api/membri';
const user = getUser();

async function loadMembri() {
    const res = await fetch(API);
    const membri = await res.json();

    const tbody = document.getElementById('tabel-membri');
    const count = document.getElementById('count-membri');
    tbody.innerHTML = '';
    if (count) count.textContent = `${membri.length} membri`;

    membri.forEach(m => {
        tbody.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.nume}</td>
                <td>${m.email}</td>
                <td>${m.telefon || '—'}</td>
                <td>${m.dataInscriere || '—'}</td>
                <td><span class="badge ${m.activ ? 'badge-success' : 'badge-secondary'}">${m.activ ? 'Activ' : 'Inactiv'}</span></td>
                <td>
                    ${user && user.rol === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="stergeMembru(${m.id})"><i class="ti ti-trash"></i></button>` : ''}
                </td>
            </tr>
        `;
    });
}

async function adaugaMembru() {
    const membru = {
        nume: document.getElementById('nume').value,
        email: document.getElementById('email').value,
        telefon: document.getElementById('telefon').value,
        dataInscriere: document.getElementById('dataInscriere').value,
        activ: true
    };

    if (!membru.nume || !membru.email || !membru.telefon || !membru.dataInscriere) {
        alert('Completează toate câmpurile!');
        return;
    }

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membru)
    });

    document.getElementById('nume').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefon').value = '';
    document.getElementById('dataInscriere').value = '';

    loadMembri();
}

async function stergeMembru(id) {
    if (!confirm('Sigur vrei să ștergi acest membru?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadMembri();
}

loadMembri();