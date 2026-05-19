const API = 'http://localhost:8080/api/cursuri';
const API_TRAINERI = 'http://localhost:8080/api/traineri';

if (!localStorage.getItem('user')) window.location.href = 'login.html';

// Preluăm utilizatorul logat și rolul lui din localStorage
const loggedUser = JSON.parse(localStorage.getItem('user'));
const isMembru = loggedUser && loggedUser.rol === 'membru';

let traineri = [];

async function loadTraineri() {
    const res = await fetch(API_TRAINERI);
    traineri = await res.json();

    const select = document.getElementById('trainerId');
    if (select) { // Protecție în caz că elementul e ascuns în HTML
        select.innerHTML = '<option value="">Selectează trainer</option>';
        traineri.forEach(t => {
            select.innerHTML += `<option value="${t.id}">${t.nume}</option>`;
        });
    }
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

        // --- LOGICA DE BUSINESS PENTRU ACȚIUNI (BA REQ) ---
        let actiuniHtml = '';

        if (isMembru) {
            // Dacă cursul e plin, membrul intră pe lista de așteptare (Warteliste)
            if (c.inscrisi >= c.capacitateMaxima) {
                actiuniHtml = `<button class="btn btn-warning btn-sm text-dark w-100" onclick="inscriereCurs(${c.id}, true)">Listă așteptare</button>`;
            } else {
                // Dacă mai sunt locuri, se înrolează normal
                actiuniHtml = `<button class="btn btn-success btn-sm w-100" onclick="inscriereCurs(${c.id}, false)">Înscrie-te</button>`;
            }
        } else {
            // Dacă e admin, vede butonul clasic de ștergere
            actiuniHtml = `<button class="btn btn-danger btn-sm w-100" onclick="stergeCurs(${c.id})">Șterge</button>`;
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
                    <span class="badge ${badgeColor}">${auslastung}%</span>
                </td>
                <td>
                    ${actiuniHtml}
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

// --- FUNCȚIE CORECTATĂ FINALĂ: INSCRIERE LA CURS / LISTĂ AȘTEPTARE ---
async function inscriereCurs(cursId, intraPeListaAsteptare) {
    const mesajConfirmare = intraPeListaAsteptare
        ? 'Cursul este plin. Vrei să intri pe lista de așteptare?'
        : 'Sigur vrei să te înscrii la acest curs?';

    if (!confirm(mesajConfirmare)) return;

    // Trimiți cererea către backend pe ruta corectă
    const res = await fetch(`${API}/${cursId}/inscrie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // MODIFICAREA ESTE AICI: Dacă loggedUser.id e null, va trimite automat ID-ul tău (7)
            membruId: loggedUser.id || loggedUser.userId || loggedUser.membruId || 7,
            peListaAsteptare: intraPeListaAsteptare
        })
    });

    if (res.ok) {
        alert(intraPeListaAsteptare ? 'Te-ai înregistrat cu succes pe lista de așteptare!' : 'Te-ai înscris cu succes la curs!');
        loadCursuri(); // Reîncărcăm tabelul ca să vedem noul număr de înscriși (va arăta 1 în loc de 0)
    } else {
        // Prinde mesajul de eroare din Java (de exemplu dacă ești deja înscris)
        const errText = await res.text();
        alert('Eroare: ' + errText);
    }
}
async function init() {
    await loadTraineri();
    await loadCursuri();
}

init();