/*
En esta parte seteamos una a una las preferencias del cliente para 
filtrarle una lista de restaurantes que se adecuen a sus preferencias

*/
//Variable para saber en que parte del proceso estamos

preferencias = [];

const conatiner = document.createElement("div");
const row = document.createElement("div");
const col = document.createElement("div");
const center = document.createElement("div");

conatiner.classList.add("conatiner");
conatiner.id = "contenedorPreferencias"
row.classList.add("row");
row.classList.add("justify-content-center");
col.classList.add("col-6");
center.classList.add("text-center");

const img = document.createElement("img");
img.classList.add("img-fluid");
img.setAttribute("src", "./image/ubicacion.png");
img.setAttribute("alt", "Image");

const input = document.createElement("input");
input.classList.add("form-control");
input.setAttribute("placeholder", "Indique una zona");
input.setAttribute("type", "text");

input.addEventListener(("input"), () => { 

    localStorage.setItem("preferencias", input.value); 
});

const btn = document.createElement("button");
btn.classList.add("botonInicio");
btn.classList.add("btn");
btn.classList.add("text-white");
btn.textContent = "Siguiente";

btn.onclick = () => { 
    preferencias.push(localStorage.getItem("preferencias"));
    input.value = "";
    chekZone(); 
}

const btnAtras = document.createElement("button");
btnAtras.classList.add("botonInicio");
btnAtras.classList.add("btn");
btnAtras.classList.add("text-white");
btnAtras.textContent = "Atrás";

btnAtras.onclick = () => { 

    removePage();
    if(Page === "ubicacion") window.location.href = 'Index.html';
    if(Page === "servicio") createZonePage();
    if(Page === "estilo") createServicePage();
    if(Page === "resto") callStyle();
    
 }

document.body.append(conatiner);
conatiner.appendChild(row);
row.appendChild(col);

col.appendChild(center);
center.appendChild(img);

center.classList.add("mt-3");
col.appendChild(center);
center.appendChild(input);
center.appendChild(btnAtras);
center.appendChild(btn);

//Funcion modificadora del input

//Funciones de los botones

function chekZone(){

    fetch("./data.json")
        .then(response => { return response.json(); })
        .then( List => {
            //Busco el resto en el JSON
            let user = localStorage.getItem("preferencias");

            let reSearch = List.restos.some((el) => el.Zona.toUpperCase() == user.toUpperCase() );

            if (reSearch) {
              
                createServicePage();
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'No hay restaurantes en esa zona',
                text: 'Intente buscar en otra zona'
                
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
function callStyle(){

    removePage();
    createStylePage();


}
function filterResto(){ //Anda pero hay que ajustar un poco mas la busqueda 

    removePage();
    createStylePage();

    fetch("./data.json")
        .then(response => { return response.json(); })
        .then( List => {
            //Busco el resto en el JSON
            let ubicacion = preferencias[0];
            let servicio = preferencias[1];
            let estilo = preferencias[2];

            console.log("ubicacion: " + ubicacion + "\nservicio: " + servicio + "\nestilo: " + estilo);

            let auxUbicacion = []
            let auxServicio = [];
            let auxEstilo = [];

            List.restos.forEach((resto) => {

                let chekServicio = resto.Categorias.some((cat) => cat.toUpperCase() == servicio.toUpperCase() );
                if (chekServicio) auxServicio.push(resto);

                if (estilo.toUpperCase() == resto.Estilo.toUpperCase()) auxEstilo.push(resto);
                if (ubicacion.toUpperCase() == resto.Zona.toUpperCase()) auxUbicacion.push(resto);
                
            });

            console.log(auxUbicacion);
            console.log(auxServicio);
            console.log(auxEstilo);

            let firstSearch = [];
            let secondSearch = [];
            let reSearch = [];

            auxUbicacion.forEach((resto1) =>{

                firstSearch = auxServicio.filter((resto2) => resto1.ID == resto2.ID);

                secondSearch = auxEstilo.filter((resto2) => resto1.ID == resto2.ID);
            });

            firstSearch.forEach((resto1) =>{

                reSearch = secondSearch.filter((resto2) => resto1.ID == resto2.ID);
                
            });

            if (reSearch.length > 0) {
              
                Swal.fire({
                    icon: 'sucess',
                    title: 'Lo encontraste bro',
                    text: 'Salio: ' + reSearch[0]
                    
                  })
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'No hay restaurantes con esas caracteristicas',
                text: 'Intente buscar en otra zona'
                
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
//Funciones creadoras de HTML

//Aplicar cambios
function aplicarCambios() {

    document.body.append(conatiner);
    conatiner.appendChild(row);
    row.appendChild(col);

    col.appendChild(center);
    center.appendChild(img);

    center.classList.add("mt-3");
    col.appendChild(center);
    center.appendChild(input);
    center.appendChild(btnAtras);
    center.appendChild(btn);
}
//UBICACION
function createZonePage(){
    
    img.setAttribute("src", "./image/ubicacion.png");
    
    input.setAttribute("placeholder", "Indique una zona");
    input.addEventListener(("input"), () => { 

        localStorage.setItem("ubicacion", input.value); 
    });

    btn.onclick = () => { 
        preferencias.push(localStorage.getItem("preferencias"));
        input.value = "";
        chekZone() }

    aplicarCambios()
    
}
//SERVICIO
function createServicePage() {

    img.setAttribute("src", "./image/servicio.png");

    btn.onclick = () => { 
        preferencias.push(localStorage.getItem("preferencias"));
        input.value = "";
        callStyle() 
    }

    aplicarCambios()
}
//ESTILO
function createStylePage() {

    img.setAttribute("src", "./image/estilo.png");
    
    btn.onclick = () => { 
        preferencias.push(localStorage.getItem("preferencias"));
        input.value = "";
        filterResto() 
    }

    aplicarCambios()
}
//RESTO
function createResto() {}
//BORRAR HTML
function removePage() {

    const container = document.getElementById("contenedorPreferencias");
    container.remove();
}







