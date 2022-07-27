class Producto {
    constructor(id, nombre, precio, categoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
    mostrarProducto(){
        return " id: " +
        this.id +
        " precio: " +
        this.precio +
        " producto: " +
        this.nombre +
        "\n";
    }
}

function comprar(nombre, telefono, email, productosEnCarro) {
    let cant = productosEnCarro.reduce((acc, item) => item.precio + acc, 0);
    alert("Thanks " + nombre + " for your purchase \n Overall: $ " + cant) 
}

let productos = [
    new Producto (100, "Skull ring", 80, "rings"),
    new Producto (101, "Dragon tail", 110, "chains"),
    new Producto (102, "Leather black", 150, "bracelets"),
    new Producto (103, "Metal fence", 70, "earrings"),
    new Producto (104, "Blades of olympus", 80, "keychains"),
    new Producto (105, "Crow ring", 90, "rings"),
    new Producto (106, "Red Skin Indian Ring", 70, "rings"),
    new Producto (107, "Skulls Ring", 70, "rings"),
    new Producto (108, "Shen Long", 70, "bracelets"),
];
let categorias = ["rings", "chains", "bracelets", "earrings", "keychains"]

let productosEnCarro = [];

let categoria = "";

while (categoria != "salir" && categoria != null) {
    let aux = categorias.join(", ");
    categoria = prompt('Enter a category or press "Cancel": \n(' + aux + ')');

    if (categoria != "salir" && categoria != null) {
        let productosFiltradosPorCategoria = productos.filter(
            (item) => item.categoria == categoria);
        
        let cartel = "";

        for (let i = 0; i < productosFiltradosPorCategoria.length; i++) {
            cartel+= productosFiltradosPorCategoria[i].mostrarProducto();
        }
        let idSeleccionado = parseInt(prompt(
                "Select the ID of the product you want to add \n\n" + cartel
            )
        );

        let productoParaCarro = productosFiltradosPorCategoria.find
        ((item) => item.id == idSeleccionado
        );

        console.log(productoParaCarro);
        
        if (productoParaCarro) {
            productosEnCarro.push(productoParaCarro);
        }
    }
}  


if (productosEnCarro.length > 0){
    alert("Enter your data to finish the purchase");
    let nombre = prompt("Insert you're name");
    let telefono = prompt("Insert you're direction");
    let email = prompt("Insert you're phone number");
    comprar(nombre, telefono, email, productosEnCarro);
}



