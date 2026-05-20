if (!localStorage.getItem('user')) window.location.href = 'login.html';

const API = 'http://localhost:8080/api/traineri';
const user = getUser();

// variabilă globală pentru a păstra lista completă de traineri în memorie
let totiTrainerii = [];

async function loadTraineri() {
    const res = await fetch(API);
    totiTrainerii = await res.json();

    const count = document.getElementById('count-traineri');
    if (count) count.textContent = `${totiTrainerii.length} traineri`;

    // tabelul cu lista completă adusă de pe server
    rendereazaTabelTraineri(totiTrainerii);
}

// funcție pentru a desena tabelul pe ecran
function rendereazaTabelTraineri(listaTraineri) {
    const tbody = document.getElementById('tabel-traineri');
    if (!tbody) return;

    tbody.innerHTML = '';

    listaTraineri.forEach(t => {
        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.nume}</td>
                <td>${t.specializare || '—'}</td>
                <td>${t.email || '—'}</td>
                <td>${t.telefon || '—'}</td>
                <td>
                    ${user && user.rol === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="stergeTrainer(${t.id})"><i class="ti ti-trash"></i></button>` : ''}
                </td>
            </tr>
        `;
    });
}

// funcție de filtrare
function aplicaFiltruTraineri() {
    const searchInput = document.getElementById('searchTrainerInput');
    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase();

    // filtrare lista globală după nume/specializare
    const traineriFiltrati = totiTrainerii.filter(t => {
        const name = (t.nume || '').toLowerCase();
        const specializare = (t.specializare || '').toLowerCase();

        return name.includes(searchText) || specializare.includes(searchText);
    });

    // tabelul cu rezultatele găsite
    rendereazaTabelTraineri(traineriFiltrati);
}

async function adaugaTrainer() {
    const trainer = {
        nume: document.getElementById('nume').value,
        specializare: document.getElementById('specializare').value,
        email: document.getElementById('email').value,
        telefon: document.getElementById('telefon').value
    };

    if (!trainer.nume || !trainer.specializare || !trainer.email || !trainer.telefon) {
        alert('Completează toate câmpurile!');
        return;
    }

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainer)
    });

    document.getElementById('nume').value = '';
    document.getElementById('specializare').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefon').value = '';

    // Reseteaza bara de căutare când se adăugăun trainer nou
    const searchInput = document.getElementById('searchTrainerInput');
    if (searchInput) searchInput.value = '';

    loadTraineri();
}

async function stergeTrainer(id) {
    if (!confirm('Sigur vrei să ștergi acest trainer?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadTraineri();
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchTrainerInput');
    if (searchInput) {
        searchInput.addEventListener('input', aplicaFiltruTraineri);
    }
});


loadTraineri();