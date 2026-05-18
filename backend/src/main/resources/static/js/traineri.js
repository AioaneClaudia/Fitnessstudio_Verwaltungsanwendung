const API = 'http://localhost:8080/api/traineri';

async function loadTraineri() {
    const res = await fetch(API);
    const traineri = await res.json();

    const tbody = document.getElementById('tabel-traineri');
    tbody.innerHTML = '';

    traineri.forEach(t => {
        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.nume}</td>
                <td>${t.specializare}</td>
                <td>${t.email}</td>
                <td>${t.telefon}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="stergeTrainer(${t.id})">Șterge</button>
                </td>
            </tr>
        `;
    });
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

    loadTraineri();
}

async function stergeTrainer(id) {
    if (!confirm('Sigur vrei să ștergi acest trainer?')) return;

    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadTraineri();
}

loadTraineri();