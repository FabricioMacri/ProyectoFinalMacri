/*
En este archivo se busca cargar todos los datos del restaurante para crear y editar los elementos del dom en funcion de los mismos
*/

//En esta parte llegara el objeto del resto 

function cargarResto(resto) {

let Total = 0;

//Buscamos en el storage si ya habia items cargados en el carrito, de ser asi los cargamos

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    if(Number(clave) > 0) { 
        let item = JSON.parse(localStorage.getItem(clave)); 
        if (item instanceof Object && item !== null){ 
        
            for(let j = 0; j < item.Cantidad ; j++){

                agregarItem(item.Id)
            }
        }
    }
}

//Esta funcion agrega los items al carrito junto con su precio y un boton para poder quitarlos

function agregarItem(ID) {

    let Producto = resto.Productos.find((prod) => prod.Id == ID);

    let prodName = document.createElement("p");
    prodName.classList.add("card-title");
    //prodName.classList.add("TITULOS");
    prodName.classList.add("elementosCarrito");
    prodName.id = "PD" + ID;
    prodName.textContent = Producto.nombre + "\n$" + Producto.precio;
    carrito.appendChild(prodName);

    let newButton = document.createElement("a");

    newButton.setAttribute("role", "button");
    newButton.classList.add("btn");
    newButton.classList.add("btn-primary");
    newButton.textContent = "-";
    newButton.id = "BTN" + ID;

    newButton.onclick = () => {Quitar(String(Producto.Id))}

    carrito.appendChild(newButton);


    Total = Total + Producto.precio;

    const totalPedido = document.querySelector("#dropdownMenuButton1");

    totalPedido.textContent = "Total: $" + Total;
}
//Esta funcion es activada por el boton antes mencionado y quita del carrito el item asociado por medio del ID

function Quitar(ID){

    let item = document.querySelector("#PD" + ID);
    item.remove();
    let BTN = document.querySelector("#BTN" + ID);
    BTN.remove();

    let Producto = resto.Productos.find((prod) => prod.Id == ID);

    Total = Total - Producto.precio;

    const totalPedido = document.querySelector("#dropdownMenuButton1");

    totalPedido.textContent = "Total: $" + Total;

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if(Number(clave) > 0) { 
            let prod = JSON.parse(localStorage.getItem(clave)); 
            if (prod instanceof Object && prod !== null){ 
            
                if(Producto.Id == prod.Id){
    
                    prod.Cantidad = prod.Cantidad - 1;
                    if(prod.Cantidad == 0) localStorage.removeItem(prod.Id);
                    else {
                        const enJSON = JSON.stringify(prod);
                        localStorage.setItem(clave, enJSON);
                    }
                }
            }
        }
    }

}

//Esta funcion esta asociada al boton de agregar de cada item y lo carga en el localstorage para posteriormente llamar a agregarItem

function Agregar(ID) {

    const carrito = document.querySelector("#carrito");

    let Producto = resto.Productos.find((prod) => prod.Id == ID);

    let encontrado = false;

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if(Number(clave) > 0) { 
            let item = JSON.parse(localStorage.getItem(clave)); 
            if (item instanceof Object && item !== null){ 
            
                if(Producto.Id == item.Id){
    
                    item.Cantidad++;
                    const enJSON = JSON.stringify(item);
                    localStorage.setItem(clave, enJSON);
                    encontrado = true;
                }
            }
        }
    }
    if(!encontrado){
        const enJSON = JSON.stringify(Producto);
        localStorage.setItem(ID, enJSON);
    }

    agregarItem(Producto.Id);
    
}

//en esta funcion se calcula el total y queda guardado en el storage

function Pagar(){

    let Total = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if(Number(clave) > 0) { 
            let item = JSON.parse(localStorage.getItem(clave)); 
            if (item instanceof Object && item !== null){ 
            
                for(let j = 0; j < item.Cantidad ; j++){
    
                    Total += item.Precio;
                }
            }
        }
    } 

    localStorage.clear();
    localStorage.setItem("Total", Total);

}

const botonPagar = document.querySelector("#botonPagar");

//botonPagar.onclick = () => {Pagar()}

const volver = document.getElementById("volverResto");
volver.onclick = () => { 
    
    const plantillaCompras = document.getElementById("plantillaCompras");
    plantillaCompras.remove();
    while (document.body.lastElementChild != undefined){

        let aux = document.body.lastElementChild;
        document.body.removeChild(aux);
    }
    createZonePage(); 
}

//Indico en la parte superior los datos del restaurante

let tituloResto = document.querySelector("#tituloResto");

tituloResto.textContent = resto.Nombre;

let infoResto = document.querySelector("#restoInfo");

infoResto.textContent = resto.Puntuacion + " / " + resto.Demora + " / " + "Envio " + resto.Envio;

//Agrego al menu de categorias todas las que tiene mi restaurante

let primero = true;

let acum = 1;

resto.Categorias.forEach((newCat) => {

let cat = document.createElement("a");

cat.textContent = newCat;


let contenedor = document.createElement("li");
cat.classList.add("nav-item");
if (primero){ 
    cat.classList.add("active");
    primero = false;
}


let seccion = document.querySelector("#CATS");

cat.classList.add("nav-link");
cat.classList.add("text-white");

cat.setAttribute("href", "#" + newCat);

seccion.appendChild(contenedor);

contenedor.appendChild(cat);

//Creo la seccion de cada categoria para luego agregarle sus productos

let newSection = document.createElement("section");

newSection.classList.add("row");
newSection.classList.add("justify-content-center");
newSection.classList.add("container-fluid");

let newTittle = document.createElement("h2");
newTittle.textContent = newCat;
newTittle.classList.add("TITULOS");
newTittle.id = newCat;

document.body.append(newSection);
newSection.appendChild(newTittle);

let newDiv = document.createElement("div");
newDiv.classList.add("container");
document.body.append(newDiv);

let newDiv2 = document.createElement("div");
newDiv2.classList.add("row");
newDiv.appendChild(newDiv2);

let Aux = [];

//Creo una lista con los items pertenecientes a la categoria y luego los agrego a su seccion con su nombre, precio y boton de agregar

resto.Productos.forEach((newProd) => {

    if(newProd.categoria == newCat) Aux.push(newProd);
});


Aux.forEach((newProd) => {


        let newDiv3 = document.createElement("div");
        newDiv3.classList.add("col-md-4");
        newDiv3.id = "sec" + String(acum);
        newDiv2.appendChild(newDiv3);
        
        let ref = document.querySelector("#sec" + String(acum));
        let newDiv4 = document.createElement("div");
        newDiv4.classList.add("card-body");
        newDiv4.classList.add("itemsSecc");
        ref.appendChild(newDiv4);

        let prodName = document.createElement("h5");
        prodName.classList.add("card-title");
        prodName.classList.add("TITULOS");
        prodName.textContent = newProd.nombre;
        newDiv4.appendChild(prodName);

        let prodPrecio = document.createElement("h5");
        prodPrecio.classList.add("card-title");
        prodPrecio.classList.add("TITULOS");
        prodPrecio.textContent = "$" + newProd.precio;
        newDiv4.appendChild(prodPrecio);

        let newButton = document.createElement("a");

        newButton.setAttribute("role", "button");
        newButton.classList.add("btn");
        newButton.classList.add("btn-primary");
        newButton.classList.add("productoButton");
        newButton.textContent = "Agregar";

        newButton.onclick = () => {Agregar(String(newProd.Id))}

        newDiv4.appendChild(newButton);
        
        acum = acum + 1;
        
    
});

});

//Esto lo hice porque fue la unica manera que encontre de separar la barra del menu del ultimo item cargado para que se vea bien :)
/*
let espacio = document.createElement("p");
espacio.textContent = "espacio";
espacio.classList.add("#TITULOS");
document.body.append(espacio);
*/
}
