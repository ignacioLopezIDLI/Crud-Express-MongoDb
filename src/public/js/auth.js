document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/user'; 
            } else {
                // Muestra un mensaje de error o maneja el flujo de error
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

