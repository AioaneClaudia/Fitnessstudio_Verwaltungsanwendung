// async function register() {
//     const nume = document.getElementById('nume').value;
//     const email = document.getElementById('email').value;
//     const parola = document.getElementById('parola').value;
//     const parola2 = document.getElementById('parola2').value;
//     // Citim rolul selectat de utilizator (membru sau trainer)
//     const rol = document.getElementById('rol').value;

//     if (!nume || !email || !parola || !parola2 || !rol) {
//         showEroare('Completează toate câmpurile!');
//         return;
//     }

//     if (parola !== parola2) {
//         showEroare('Parolele nu coincid!');
//         return;
//     }

//     if (parola.length < 6) {
//         showEroare('Parola trebuie să aibă minim 6 caractere!');
//         return;
//     }

//     const res = await fetch('http://localhost:8080/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // Acum trimitem rolul dinamic colectat din formular
//         body: JSON.stringify({ nume, email, parola, rol })
//     });

//     const data = await res.json();

//     if (data.status === 'ok') {
//         showSucces('Cont creat cu succes! Redirecționare...');
//         setTimeout(() => window.location.href = 'login.html', 2000);
//     } else {
//         showEroare(data.mesaj);
//     }
// }

// function showEroare(mesaj) {
//     const el = document.getElementById('eroare');
//     el.textContent = mesaj;
//     el.classList.remove('d-none');
//     document.getElementById('succes').classList.add('d-none');
// }

// function showSucces(mesaj) {
//     const el = document.getElementById('succes');
//     el.textContent = mesaj;
//     el.classList.remove('d-none');
//     document.getElementById('eroare').classList.add('d-none');
// }

// document.addEventListener('keypress', e => {
//     if (e.key === 'Enter') register();
// });