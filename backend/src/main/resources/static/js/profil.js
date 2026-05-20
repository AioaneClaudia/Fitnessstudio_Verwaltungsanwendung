requireAuth();

const API_USERS = 'http://localhost:8080/api/users';
const API_CURSURI = 'http://localhost:8080/api/cursuri';
const user = getUser();

async function loadProfil() {
    const res = await fetch(`${API_USERS}/${user.id}`);
    const profil = await res.json();

    document.getElementById('nume').value = profil.nume || '';
    document.getElementById('email').value = profil.email || '';
    document.getElementById('telefon').value = profil.telefon || '';
    document.getElementById('adresa').value = profil.adresa || '';
    document.getElementById('rol').value = profil.rol || '';
    document.getElementById('data-inregistrare').textContent = profil.dataInregistrare || 'Necunoscut';
}

async function loadCursuriMele() {
    const res = await fetch(API_CURSURI);
    const cursuri = await res.json();

    const tbody = document.getElementById('tabel-cursuri-mele');
    tbody.innerHTML = '';

    const cursurileMele = cursuri.filter(c =>
        (c.membriInscrisi && c.membriInscrisi.includes(user.id)) ||
        (c.waitingList && c.waitingList.includes(user.id))
    );

    if (cursurileMele.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;padding:20px">Nu ești înscris la niciun curs.</td></tr>';
        return;
    }

    cursurileMele.forEach(c => {
        const eInscris = c.membriInscrisi && c.membriInscrisi.includes(user.id);
        const status = eInscris
            ? '<span class="badge badge-success">Înscris</span>'
            : '<span class="badge badge-warning">Waiting</span>';

        tbody.innerHTML += `
            <tr>
                <td>${c.nume}</td>
                <td>${c.zi}</td>
                <td>${c.ora}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="retragere(${c.id})">Retrage</button>
                </td>
            </tr>
        `;
    });
}

async function salveazaProfil() {
    const updated = {
        nume: document.getElementById('nume').value,
        telefon: document.getElementById('telefon').value,
        adresa: document.getElementById('adresa').value
    };

    const res = await fetch(`${API_USERS}/${user.id}/profil`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
    });

    const data = await res.json();

    if (data.status === 'ok') {
        document.getElementById('succes').classList.remove('d-none');
        document.getElementById('eroare').classList.add('d-none');
        setTimeout(() => document.getElementById('succes').classList.add('d-none'), 3000);

        const userLocal = getUser();
        userLocal.nume = updated.nume;
        localStorage.setItem('user', JSON.stringify(userLocal));

        document.getElementById('user-name').textContent = updated.nume;
        document.getElementById('user-avatar').textContent = updated.nume.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
    } else {
        document.getElementById('eroare').textContent = 'Eroare la salvare!';
        document.getElementById('eroare').classList.remove('d-none');
    }
}

async function retragere(cursId) {
    if (!confirm('Sigur vrei să te retragi de la acest curs?')) return;
    await fetch(`${API_CURSURI}/${cursId}/inscriere/${user.id}`, { method: 'DELETE' });
    loadCursuriMele();
}

async function init() {
    await loadProfil();
    await loadCursuriMele();
}

init();