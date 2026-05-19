const API = 'http://localhost:8080/api/traineri';

if (!localStorage.getItem('user')) window.location.href = 'login.html';

const loggedUser = JSON.parse(localStorage.getItem('user'));
const isAdmin = loggedUser && loggedUser.rol === 'admin';
const curentUserEmail = loggedUser ? loggedUser.email : '';

// --- FUNCȚIE AJUTĂTOARE PENTRU VALIDARE EMAIL ---
function esteEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function loadTraineri() {
    const res = await fetch(API);
    const traineri = await res.json();
    const tbody = document.getElementById('tabel-traineri');
    tbody.innerHTML = '';

    traineri.forEach(t => {
        const areDreptDeModificare = isAdmin || t.nume === loggedUser.nume || t.email === curentUserEmail;
        let actiuneHtml = areDreptDeModificare ?
            `<button class="btn btn-warning btn-sm text-dark" onclick="incarcaDateInFormular(${t.id}, '${t.nume}', '${t.specializare || ''}', '${t.email || ''}', '${t.telefon || ''}')">Editează</button>` :
            `<span class="text-muted text-xs">Fără permisiuni</span>`;

        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.nume}</td>
                <td>${t.specializare || '<span class="text-muted">Nesetată</span>'}</td>
                <td>${t.email || '<span class="text-muted">Nesetat</span>'}</td>
                <td>${t.telefon || '<span class="text-muted">Nesetat</span>'}</td>
                <td>${actiuneHtml}</td>
            </tr>
        `;
    });
}

let idTrainerInModificare = null;

function incarcaDateInFormular(id, nume, specializare, email, telefon) {
    idTrainerInModificare = id;
    document.getElementById('zona-adaugare-trainer').style.display = 'block';
    document.getElementById('titlu-formular-trainer').textContent = "Modifică Detalii Profil";
    document.getElementById('nume').value = nume;
    document.getElementById('specializare').value = specializare;
    document.getElementById('email').value = email;
    document.getElementById('telefon').value = telefon;
    const btn = document.getElementById('btn-actiune-trainer');
    btn.textContent = "Salvează";
    btn.className = "btn btn-warning w-100 text-dark";
    btn.setAttribute('onclick', 'salveazaModificareTrainer()');
}

async function salveazaModificareTrainer() {
    const email = document.getElementById('email').value;
    const telefon = document.getElementById('telefon').value;

    // VALIDARE STRICTĂ
    if (!esteEmailValid(email)) {
        alert('Te rog introdu o adresă de email validă (ex: nume@domeniu.com)!');
        return;
    }

    const trainerActualizat = {
        id: idTrainerInModificare,
        nume: document.getElementById('nume').value,
        specializare: document.getElementById('specializare').value,
        email: email,
        telefon: telefon
    };

    const res = await fetch(`${API}/${idTrainerInModificare}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainerActualizat)
    });

    if (res.ok) {
        alert('Datele au fost actualizate!');
        reseteazaFormular();
        await loadTraineri();
    }
}

async function adaugaTrainer() {
    const email = document.getElementById('email').value;

    // VALIDARE STRICTĂ
    if (!esteEmailValid(email)) {
        alert('Te rog introdu o adresă de email validă (ex: nume@domeniu.com)!');
        return;
    }

    const trainer = {
        nume: document.getElementById('nume').value,
        specializare: document.getElementById('specializare').value,
        email: email,
        telefon: document.getElementById('telefon').value
    };

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainer)
    });

    reseteazaFormular();
    await loadTraineri();
}

function reseteazaFormular() {
    idTrainerInModificare = null;
    document.getElementById('nume').value = '';
    document.getElementById('specializare').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefon').value = '';
    const titlu = document.getElementById('titlu-formular-trainer');
    titlu.textContent = "Adaugă Trainer Nou";
    const btn = document.getElementById('btn-actiune-trainer');
    btn.textContent = "Adaugă";
    btn.className = "btn btn-primary w-100";
    btn.setAttribute('onclick', 'adaugaTrainer()');
    if (!isAdmin) document.getElementById('zona-adaugare-trainer').style.display = 'none';
}

function aplicaSecuritateInterfata() {
    if (!isAdmin) document.getElementById('zona-adaugare-trainer').style.display = 'none';
}

init();
async function init() {
    aplicaSecuritateInterfata();
    await loadTraineri();
}