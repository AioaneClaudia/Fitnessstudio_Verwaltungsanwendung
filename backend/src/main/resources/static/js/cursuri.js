requireAuth();

const API = 'http://localhost:8080/api/cursuri';
const API_TRAINERI = 'http://localhost:8080/api/traineri';

let traineri = [];
const user = getUser();

async function loadTraineri() {
    const res = await fetch(API_TRAINERI);
    traineri = await res.json();
    const select = document.getElementById('trainerId');
    if (!select) return;
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
    const count = document.getElementById('count-cursuri');
    tbody.innerHTML = '';
    if (count) count.textContent = `${cursuri.length} cursuri`;

    cursuri.forEach(c => {
        const auslastung = c.capacitateMaxima > 0
            ? Math.round((c.inscrisi / c.capacitateMaxima) * 100)
            : 0;

        const progressClass = auslastung >= 90 ? 'bg-danger' :
                              auslastung >= 60 ? 'bg-warning' : 'bg-success';

        const eInscris = c.membriInscrisi && c.membriInscrisi.includes(user.id);
        const eWaiting = c.waitingList && c.waitingList.includes(user.id);

        let btnInscriere = '';
        if (user.rol === 'membru') {
            if (eInscris) {
                btnInscriere = `
                    <span class="badge badge-success">Înscris</span>
                    <button class="btn btn-outline-danger btn-sm" onclick="dezinscriere(${c.id})">Retrage</button>
                `;
            } else if (eWaiting) {
                btnInscriere = `
                    <span class="badge badge-warning">Waiting</span>
                    <button class="btn btn-outline-danger btn-sm" onclick="dezinscriere(${c.id})">Retrage</button>
                `;
            } else {
                btnInscriere = `
                    <button class="btn btn-primary btn-sm" onclick="inscriere(${c.id})">Înscrie-te</button>
                `;
            }
        }

        let btnSterge = '';
        if (user.rol === 'admin') {
            btnSterge = `<button class="btn btn-danger btn-sm" onclick="stergeCurs(${c.id})"><i class="ti ti-trash"></i></button>`;
        }

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
                    <div class="progress">
                        <div class="progress-bar ${progressClass}" style="width:${auslastung}%"></div>
                    </div>
                    <small style="font-size:11px;color:#888">${auslastung}%</small>
                </td>
                <td style="display:flex;gap:6px;align-items:center">${btnInscriere} ${btnSterge}</td>
            </tr>
        `;
    });
}

async function inscriere(cursId) {
    const res = await fetch(`${API}/${cursId}/inscriere/${user.id}`, { method: 'POST' });
    const data = await res.json();
    alert(data.mesaj);
    loadCursuri();
}

async function dezinscriere(cursId) {
    if (!confirm('Sigur vrei să te retragi?')) return;
    const res = await fetch(`${API}/${cursId}/inscriere/${user.id}`, { method: 'DELETE' });
    const data = await res.json();
    alert(data.mesaj);
    loadCursuri();
}

async function adaugaCurs() {
    const curs = {
        nume: document.getElementById('nume').value,
        trainerId: parseInt(document.getElementById('trainerId').value),
        zi: document.getElementById('zi').value,
        ora: document.getElementById('ora').value,
        capacitateMaxima: parseInt(document.getElementById('capacitateMaxima').value),
        inscrisi: 0,
        membriInscrisi: [],
        waitingList: []
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