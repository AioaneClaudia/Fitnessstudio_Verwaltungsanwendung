async function login() {
    const email = document.getElementById('email').value;
    const parola = document.getElementById('parola').value;

    if (!email || !parola) {
        showEroare('Completează toate câmpurile!');
        return;
    }

    const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, parola })
    });

    const data = await res.json();

    if (data.status === 'ok') {
        localStorage.setItem('user', JSON.stringify({
            id: parseInt(data.id),
            nume: data.nume,
            rol: data.rol
        }));
        window.location.href = 'index.html';
    } else {
        showEroare(data.mesaj);
    }
}

function showEroare(mesaj) {
    const el = document.getElementById('eroare');
    el.textContent = mesaj;
    el.classList.remove('d-none');
}

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') login();
});

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}