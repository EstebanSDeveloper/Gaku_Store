const ProductosInfo = [
 {
    "id": 100,
    "nombre": "Skull Hipster Ring",
    "img": "../imagenes/our_collection/Anillos.jpg",
    "precio": 80,
    "categoria": "Rings",
 },

 {
    "id": 101,
    "nombre": "Dragon tail",
    "img": "../imagenes/our_collection/Cadenas.jpg",
    "precio": 110,
    "categoria": "Chains",
 },

 {
    "id": 102,
    "nombre": "Leather black",
    "img": "../imagenes/our_collection/Pulseras-2.jpg",
    "precio": 180,
    "categoria": "Bracelets",
 },

 {
    "id": 103,
    "nombre": "Metal fence",
    "img": "../imagenes/our_collection/Aretes.jpg",
    "precio": 70,
    "categoria": "Earrings",
 },

 {
    "id": 104,
    "nombre": "Blades of olympus",
    "img": "../imagenes/our_collection/Llaveros.jpg",
    "precio": 80,
    "categoria": "Keychains",
 },

 {
    "id": 105,
    "nombre": "Crow Ring",
    "img": "../imagenes/our_collection/crow_ring.jpg",
    "precio": 90,
    "categoria": "Rings",
 },

 {
    "id": 106,
    "nombre": "Red Skin Indian",
    "img": "../imagenes/our_collection/indian.jpg",
    "precio": 70,
    "categoria": "Rings",
 },

 {
    "id": 107,
    "nombre": "Skulls",
    "img": "../imagenes/our_collection/skulls.jpg",
    "precio": 80,
    "categoria": "Rings",
 },

 {
    "id": 108,
    "nombre": "Shen Long",
    "img": "../imagenes/our_collection/Shen Long_.jpg",
    "precio": 200,
    "categoria": "Bracelets",
 },

];

const carrito = [];

function renderizarProductos() {
    let tienda = document.getElementById('tienda')
}

ProductosInfo.forEach((joyas) => {

    let productoHTML = `
    <div class="col store-product ${joyas.categoria}">
            <div class="card h-100">
            <img src="${joyas.img}" class="card-img-top" alt="...">
                <div class="card-body">
                      <h5 class="card-title">${joyas.nombre}</h5>
                      <p class="card-text">$ ${joyas.precio}</p>
                      <p class="card-text"> <class="${joyas.categoria}"> Category: ${joyas.categoria}</p>
                      <p class="card-text"> Product ID: ${joyas.id} </p>
                      <button class="card-button">Add to car ${joyas.id}</button>
                </div>
            </div>
    </div>
    `
    tienda.innerHTML += productoHTML

});
renderizarProductos();

// FILTRADO DE PRODUCTOS

let btns = document.querySelectorAll('.btn');
let storeProducts = document.querySelectorAll('.store-product');

for (i = 0; i < btns.length; i++) {

   btns[i].addEventListener("click", (e) =>{
      e.preventDefault();

      const filter = e.target.dataset.filter;
      //console.log(filter);

      storeProducts.forEach((product)=> {
         if (filter === 'botonAll'){
            product.style.display = 'block';
         }else {
            if (product.classList.contains(filter)){
               product.style.display = 'block';
            } else {
               product.style.display = 'none';
            }
         }
      });
   });
};

// FIN FILTRADO DE PRODUCTOS

