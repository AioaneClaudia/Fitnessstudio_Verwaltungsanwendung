const API = 'http://localhost:8080/api/cursuri';
const API_TRAINERI = 'http://localhost:8080/api/traineri';

if (!localStorage.getItem('user')) window.location.href = 'login.html';

let traineri = [];

async function loadTraineri() {
    const res = await fetch(API_TRAINERI);
    traineri = await res.json();

    const select = document.getElementById('trainerId');
    select.innerHTML = '<option value="">Selectează trainer</option>';
    traineri.forEach(t => {
        select.innerHTML += `<option value="${t.id}">${t.nume}</option>`;
    });
}

function getNumeTrainer(id) {
    const t = traineri.find(t => t.id === id);
    return t ? t.nume : 'Necunoscut';
}

async function loadCursuri() {
    const res = await fetch(API);
    const cursuri = await res.json();

    const tbody = document.getElementById('tabel-cursuri');
    tbody.innerHTML = '';

    cursuri.forEach(c => {
        const auslastung = c.capacitateMaxima > 0
            ? Math.round((c.inscrisi / c.capacitateMaxima) * 100)
            : 0;

        const badgeColor = auslastung >= 90 ? 'bg-danger' :
                           auslastung >= 60 ? 'bg-warning text-dark' : 'bg-success';

        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.nume}</td>
                <td>${getNumeTrainer(c.trainerId)}</td>
                <td>${c.zi}</td>
                <td>${c.ora}</td>
                <td>${c.capacitateMaxima}</td>
                <td>${c.inscrisi}</td>
                <td>
                    <span class="badge ${badgeColor}">${auslastung}%</span>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="stergeCurs(${c.id})">Șterge</button>
                </td>
            </tr>
        `;
    });
}

async function adaugaCurs() {
    const curs = {
        nume: document.getElementById('nume').value,
        trainerId: parseInt(document.getElementById('trainerId').value),
        zi: document.getElementById('zi').value,
        ora: document.getElementById('ora').value,
        capacitateMaxima: parseInt(document.getElementById('capacitateMaxima').value),
        inscrisi: 0
    };

    if (!curs.nume || !curs.trainerId || !curs.zi || !curs.ora || !curs.capacitateMaxima) {
        alert('Completează toate câmpurile!');
        return;
    }

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curs)
    });

    document.getElementById('nume').value = '';
    document.getElementById('trainerId').value = '';
    document.getElementById('zi').value = '';
    document.getElementById('ora').value = '';
    document.getElementById('capacitateMaxima').value = '';

    loadCursuri();
}

async function stergeCurs(id) {
    if (!confirm('Sigur vrei să ștergi acest curs?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadCursuri();
}

async function init() {
    await loadTraineri();
    await loadCursuri();
}

init();