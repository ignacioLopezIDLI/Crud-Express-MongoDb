// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('loginButton').addEventListener('click', function() {
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         fetch('/signin', {
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               if (data.message === "Inicio de sesión exitoso") {
//                 window.location.href = "/"; // Redirige al usuario a la página de inicio
//               } else {
//                 // Mostrar un mensaje de error al usuario
//               }
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//     });
// });

