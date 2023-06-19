document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})


const fetchData = async() => {
    try{
        const res = await fetch('../api.json')
        const data = await res.json()
        //console.log(data)
        pintarProductos(data)
        detectarBotones(data)
    }   catch(error){
        console.log(error)
    }
}

const contenedorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    //console.log(template)
    data.forEach(producto => {
        //console.log(producto)
        //Captura de la imagen de cada producto, del texto y del precio
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.title
        template.querySelector('p span').textContent = producto.precio
        //si quiero hacer un addeventlistener no puedo agregarlo directamente aqui en el template, debo usar el dataset para crear esto en el TEMPLATE html
        template.querySelector('button').dataset.id = producto.id

        //clonar para que haga esto varias veces dependiendo de la entrada de datos
        const clone = template.cloneNode(true) 
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')
    
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            // Triple === tengo que hacerle el parseInt porque el item id es numero y dataset.id es un string
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            // Agrego el elemento de cantidad para que se agregue en la coleccion de objetos la caracteristica "cantidad"
            producto.cantidad = 1
            // Si el id no existe tenemos que agregar a la lista de objetos, y si si existe sumamos a la cantidad
            if(carrito.hasOwnProperty(producto.id)) {
                // ++ si ya existe en ese carrito de compras, aumento la cantidad en 1 
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            // Los tres puntos ... son spread opertator que me permite agregar una copia de ese producto
            carrito[producto.id] = { ...producto }
            console.log("carrito", carrito)

            // Funcion para pintar dentro del carrito
            pintarCarrito()
        })
    })
}

//Hacemos el carrito con un objeto y no con un array, para que sea posible sumar mas de un mismo articulo y que no aparezca duplicado, sino que aparezca como 1 unidad mas, y no como un objeto adicional duplicado en el array

const items = document.querySelector('#items')

const pintarCarrito = () => {
    
    // PENDIENTE innerHTML si no pongo este inner se va a duplicar la cantidad de objetos que agregue, entonces si agrego 1 y despues 2 me queda pintado 1, 1, 2 y luego 3 queda 1, 1, 2, 2, 3
    items.innerHTML = ''

    //const template y fragment es para pintar los objetos en el Dom 
    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
    // vamos a convertir el OBJETO en un ARRAY para utilizar en el un forEach y recorrer todo el carrito, se hace con el Object.values un array de OBJETOS
    Object.values(carrito).forEach(producto => {
        // console.log('producto', producto)
        // queryselector funciona cuando solo tengo una etiqueta de ese tipo en el html para seleccionarla
        template.querySelector('th').textContent = producto.id
        // queryselectorAll funciona para tomar todos los elementos que tengan esa etiqueta, pero puedo seleccionar uno en especifico colocando la posicion numerica de dicho elemento, no olvidar que comienza en 0 y despues 1 2 3
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad

        // Botones + y - para que cada uno tenga su respectivo id se lo estoy agregando
        template.querySelector('.btn-info').dataset.id =  producto.id
        template.querySelector('.btn-danger').dataset.id =  producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    //para evitar reflow que es que se copien varias veces los objetos, llamamos en items al appendChild 
    items.appendChild(fragment)

    pintarFooter()
    accionBotones()
}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    // Elimianr el texto Carrito vacio comience a comprar!
    footer.innerHTML = ''

    // Para cambiar el mensaje del carrito si ya habia puesto objetos y los elimino y queda vacio, toca con el Object.keys carrito porque lo vuelve un array y el .lenght solo funciona con arrays
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5" class="letra-card text-center" > Add products again to buy!</th>`

        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar el total de precio
    //convierto en array para utilizar el metodo reduce, que solo funciona en arrays, y tomamos del array solo lo que me interesa en este caso cantidad y la sumamos al acc que es el acumulador, el acc comienza en 0
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    // console.log(nCantidad)
    // ahora para sumar la cantidad total del precio
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    //console.log(nPrecio)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    //Boton vaciar carrito
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const accionBotones = () => {

    //seleccion de los botones en el Dom
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // Probar si funciona el boton
            // console.log('agregando...')
            //console.log(btn.dataset.id)
            // Detectamos el producto
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = {...producto}
            pintarCarrito()
        })

    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            // Probar si funciona el boton
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            // Si el carro queda vacio debe eliminarse todo lo que hay dentro y no solo dejar en 0 el producto
            if(producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = {...producto}
                
            }
            pintarCarrito()
        })

    })

}

// cosas 

// TOASTIFY

function clickAdd() {
    Toastify({
       text: "Added to your cart",
       duration: 3000,
       gravity: 'bottom',
       position: 'right',
       style: {
           background: '#e9e2c4',
           color: '#000000',
           border: '10px',     
          },
       // para poner una clase de css
       className: 'card-button',
       
 
   }).showToast();
 }









