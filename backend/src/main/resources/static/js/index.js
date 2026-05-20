const API_MEMBRI = 'http://localhost:8080/api/membri';
const API_TRAINERI = 'http://localhost:8080/api/traineri';
const API_CURSURI = 'http://localhost:8080/api/cursuri';

async function loadDashboard() {
    const [membri, traineri, cursuri] = await Promise.all([
        fetch(API_MEMBRI).then(r => r.json()),
        fetch(API_TRAINERI).then(r => r.json()),
        fetch(API_CURSURI).then(r => r.json())
    ]);

    document.getElementById('nr-membri').textContent = membri.filter(m => m.activ).length;
    document.getElementById('nr-traineri').textContent = traineri.length;
    document.getElementById('nr-cursuri').textContent = cursuri.length;

    const totalInscrisi = cursuri.reduce((sum, c) => sum + c.inscrisi, 0);
    const totalCapacitate = cursuri.reduce((sum, c) => sum + c.capacitateMaxima, 0);
    const auslastung = totalCapacitate > 0 ? Math.round((totalInscrisi / totalCapacitate) * 100) : 0;
    document.getElementById('auslastung-general').textContent = auslastung + '%';

    const tbody = document.getElementById('tabel-auslastung');
    tbody.innerHTML = '';

    cursuri.forEach(c => {
        const a = c.capacitateMaxima > 0
            ? Math.round((c.inscrisi / c.capacitateMaxima) * 100)
            : 0;

        const progressClass = a >= 90 ? 'bg-danger' : a >= 60 ? 'bg-warning' : 'bg-success';

        tbody.innerHTML += `
            <tr>
                <td>${c.nume}</td>
                <td>${c.zi}</td>
                <td>${c.ora}</td>
                <td>${c.inscrisi} / ${c.capacitateMaxima}</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar ${progressClass}" style="width:${a}%"></div>
                    </div>
                    <small style="font-size:11px;color:#888">${a}%</small>
                </td>
            </tr>
        `;
    });
}

loadDashboard();