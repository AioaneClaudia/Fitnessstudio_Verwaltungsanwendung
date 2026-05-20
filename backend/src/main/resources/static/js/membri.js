const API = 'http://localhost:8080/api/membri';
let totiMembrii = [];
let directieSortare = true;

async function loadMembri() {
    const res = await fetch(API);
    totiMembrii = await res.json();

    // Actualizăm badge-ul nativ cu numărul total de membri aduși din DB
    const count = document.getElementById('count-membri');
    if (count) count.textContent = `${totiMembrii.length} membri`;

    aplicaFiltrele();
}

function rendereazaTabelMembri(listaMembri) {
    const tbody = document.getElementById('tabel-membri');
    if (!tbody) return;
    tbody.innerHTML = '';

    listaMembri.forEach(m => {
        tbody.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.nume}</td>
                <td>${m.email}</td>
                <td>${m.telefon}</td>
                <td>${m.dataInscriere}</td>
                <td>
                    <span class="badge ${m.activ ? 'bg-success' : 'bg-secondary'}">
                        ${m.activ ? 'Activ' : 'Inactiv'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="stergeMembru(${m.id})">Șterge</button>
                </td>
            </tr>
        `;
    });
}

function aplicaFiltrele() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');

    if (!searchInput || !statusFilter) return;

    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const membriFiltrati = totiMembrii.filter(m => {
        const matchesSearch = (m.nume || '').toLowerCase().includes(searchText) || (m.email || '').toLowerCase().includes(searchText);
        const statusText = m.activ ? 'Activ' : 'Inactiv';
        const matchesStatus = (selectedStatus === 'all') || (statusText === selectedStatus);
        return matchesSearch && matchesStatus;
    });

    rendereazaTabelMembri(membriFiltrati);
}

function sorteazaTabelDupaStatus() {
    totiMembrii.sort((a, b) => {
        const textA = a.activ ? 'Activ' : 'Inactiv';
        const textB = b.activ ? 'Activ' : 'Inactiv';
        return directieSortare ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });

    directieSortare = !directieSortare;
    const sortIcon = document.getElementById('sort-icon');
    if (sortIcon) sortIcon.textContent = directieSortare ? ' ▲' : ' ▼';

    aplicaFiltrele();
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

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');

    if (searchInput && statusFilter) {
        searchInput.addEventListener('input', aplicaFiltrele);
        statusFilter.addEventListener('change', aplicaFiltrele);
    }
});

loadMembri();