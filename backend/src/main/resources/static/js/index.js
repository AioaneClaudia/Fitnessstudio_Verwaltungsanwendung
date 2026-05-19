const API_MEMBRI = 'http://localhost:8080/api/membri';
const API_TRAINERI = 'http://localhost:8080/api/traineri';
const API_CURSURI = 'http://localhost:8080/api/cursuri';

if (!localStorage.getItem('user')) window.location.href = 'login.html';

async function loadDashboard() {
    const [membri, traineri, cursuri] = await Promise.all([
        fetch(API_MEMBRI).then(r => r.json()),
        fetch(API_TRAINERI).then(r => r.json()),
        fetch(API_CURSURI).then(r => r.json())
    ]);

    // Statistici
    const membriActivi = membri.filter(m => m.activ).length;
    document.getElementById('nr-membri').textContent = membriActivi;
    document.getElementById('nr-traineri').textContent = traineri.length;
    document.getElementById('nr-cursuri').textContent = cursuri.length;

    // Auslastung general
    const totalInscrisi = cursuri.reduce((sum, c) => sum + c.inscrisi, 0);
    const totalCapacitate = cursuri.reduce((sum, c) => sum + c.capacitateMaxima, 0);
    const auslastungGeneral = totalCapacitate > 0
        ? Math.round((totalInscrisi / totalCapacitate) * 100)
        : 0;
    document.getElementById('auslastung-general').textContent = auslastungGeneral + '%';

    // Tabel auslastung cursuri
    const tbody = document.getElementById('tabel-auslastung');
    tbody.innerHTML = '';

    cursuri.forEach(c => {
        const auslastung = c.capacitateMaxima > 0
            ? Math.round((c.inscrisi / c.capacitateMaxima) * 100)
            : 0;

        const badgeColor = auslastung >= 90 ? 'bg-danger' :
                           auslastung >= 60 ? 'bg-warning text-dark' : 'bg-success';

        tbody.innerHTML += `
            <tr>
                <td>${c.nume}</td>
                <td>${c.zi}</td>
                <td>${c.ora}</td>
                <td>${c.inscrisi} / ${c.capacitateMaxima}</td>
                <td>
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar ${badgeColor}" style="width: ${auslastung}%">
                            ${auslastung}%
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
}

loadDashboard();