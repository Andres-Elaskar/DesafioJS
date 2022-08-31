const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0);
escribirCarrito(costoTotal)
const productos = []

// llamando al .json para cargar las cards
const productosjson = () => {
    fetch('js/productos.json')
        .then (response => response.json())
        .then (data => {
            crearCards(data),
            agregarAlCarrito(data)
        
            productos.push(...data)
        })
    }
    productosjson();

// Carrito PopUp
function carritoPopUp(){
    document.getElementById("tabla-carrito").innerHTML = "" 
    carrito.forEach((producto) => { 
        document.getElementById("tabla-carrito").innerHTML += `<tr> 
        <th scope="row">${producto.id}</th>
        <td>${producto.name}</td>
        <td><img src="${producto.img}" style="height: 100px" ></td>
        <td>${producto.price}</td>
        <td><button type="button" class="btn btn-secondary borrar-producto" onclick="eliminarDelCarrito(${producto.id})">Remove</button></td>
    </tr>`
    })
}
carritoPopUp()

// Creación de CARDS en pantalla inicial
function crearCards(listado){
    listado.forEach(({id, name, img, price}) => { // desestructuración con operador avanzado => Lo hice esta sola vez, y no lo hice en la función "carritoPopUp" para que cuando lo vuelva a ver, yo entienda que es lo mismo escribirlo de cualquiera de las 2 formas
        document.getElementById("seccion-cards").innerHTML += `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${img}" alt="${name}" />        
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${name}</h5>
                        $${price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" id="btn-agregar${id}" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>`
    })
}

// Creo esta función para no repetir codigo
function escribirCarrito(parametroCosto){
    localStorage.setItem("carrito", JSON.stringify(carrito));
    document.getElementById("total-carrito").innerHTML = carrito.length + " - $"+parametroCosto;
}

// Función de filtrado
function filtroPorCategoria(categoria){
    document.getElementById("seccion-cards").innerHTML = "" //borrando las cards de todos los productos
    const productosFiltrados = productos.filter((producto) => producto.category === categoria) //Filtrando los productos
    crearCards(productosFiltrados)
    agregarAlCarrito(productosFiltrados)
}

// Aplicando la función de filtrado de forma dinámica
for (const botonFiltro of document.getElementsByClassName('filtro-categoria')){
    botonFiltro.addEventListener('click', (eventClick) =>{
        const categoria = eventClick.target.getAttribute('info-categoria');
        filtroPorCategoria(categoria)
    })
}

//Repite el forEach y agrega la función, agregar carrito
function agregarAlCarrito (lista) {
    for(const producto of lista) {
        document.getElementById("btn-agregar"+producto.id).addEventListener("click", () => {
            carrito.push(producto);
            const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0)
            escribirCarrito(costoTotal);
            carritoPopUp()
            document.getElementById("alFin").innerHTML = `<h1 class="display-4 fw-bolder">Shop in style</h1>
            <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>`
            Toastify({
                text: "Agregado al Carrito",
                duration: 1500,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gardient(to right, #00b09b, #96c92d)"
                }
            }).showToast();
        })
    }
}

// Función de borrado del carrito
function eliminarDelCarrito(productoId) {
    const prod = carrito.find((producto) => producto.id == productoId)
    let i = carrito.indexOf(prod)
    if (i != -1) carrito.splice(i, 1)
    const costoTotal = carrito.reduce((total, producto) => total + producto.price, 0)
    escribirCarrito(costoTotal)
    carritoPopUp()
    document.getElementById("Lo esperamos Nuevamente").innerHTML = `<h1 class="display-4 fw-bolder">"Deifrut - Frutas Secas & Desecadas"</h1>`
    if(carrito.lenght ==0)
    {Swal.fire({
        icon: 'success',
        title: 'Clear!',
        Text: 'Carrito Vacio'
    })
    }
}


console.log(...carrito)