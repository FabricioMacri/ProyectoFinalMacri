/*
ACLARACION: Intente hacer tambien un registro pero para modificar el JSON
             en necesario usar Node.js asi que no lo agregue, aunque pude
             modificarse el JSON de manera manual para manipular la info
             y hacer distintas pruebas.
 */


//Esta funcion chekea que el usuario y la contraseña pertenezcan a algun usuario del JSON que simula una base de datos

async function chekUser() {

    fetch("./data.json")
        .then(response => { return response.json(); })
        .then( List => {
            //Buscar si esta el usuario
            let user = localStorage.getItem("user");
            let pass = localStorage.getItem("password");

            let reSearch = List.users.some((el) => el.user == user 
            && el.password == pass);

            if (reSearch) {
              
              window.location.href = 'preferencias.html';
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'No se pudo ingresar',
                text: 'El usuario o la contraseña no son correctos.'
                
              })

            }
        }
        )
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Parece que hubo un problema...',
                text: error
                
              })
        });
}

//Agrego los eventos al boton de ingresar y los inputs

const btnLog = document.querySelector("#btnLog");

btnLog.onclick = () => { chekUser() }

let userInput  = document.getElementById("userInput")
userInput.addEventListener("input", () => {
    localStorage.setItem("user", userInput.value);
})
let passInput  = document.getElementById("password")
passInput.addEventListener("input", () => {
    localStorage.setItem("password", passInput.value);
})
