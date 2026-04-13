const prompt = require("prompt-sync")();

const productos = [
    { id: 1, nombre: "Mouse", categoria: "Periferico", precio: 50000, stock: 10, ventas: 12 },
    { id: 2, nombre: "Teclado", categoria: "Periferico", precio: 120000, stock: 5, ventas: 7 },
    { id: 3, nombre: "Monitor", categoria: "Pantalla", precio: 800000, stock: 2, ventas: 4 },
    { id: 4, nombre: "USB", categoria: "Accesorio", precio: 30000, stock: 0, ventas: 15 },
    { id: 5, nombre: "Diadema", categoria: "Audio", precio: 90000, stock: 8, ventas: 6 }
];

// FUNCIONES

function mostrarProductos() {
    console.log("\n LISTA DE PRODUCTOS");
    productos.forEach(p => {
        console.log(`${p.nombre} - $${p.precio} - Stock: ${p.stock}`);
    });
}

function stockBajo() {
    let bajo = productos.filter(p => p.stock > 0 && p.stock <= 5);
    console.log("\n STOCK BAJO");
    bajo.forEach(p => console.log(p.nombre));
}

function agotados() {
    let agotados = productos.filter(p => p.stock === 0);
    console.log("\n PRODUCTOS AGOTADOS");
    agotados.forEach(p => console.log(p.nombre));
}

function listaPrecios() {
    let lista = productos.map(p => `${p.nombre} - $${p.precio}`);
    console.log("\n LISTA DE PRECIOS");
    lista.forEach(l => console.log(l));
}

function totalInventario() {
    let total = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    console.log("\n TOTAL INVENTARIO: $" + total);
}

function totalVentas() {
    let total = productos.reduce((acc, p) => acc + p.ventas, 0);
    console.log("\n TOTAL VENTAS: " + total);
}

function ordenarPrecio() {
    let orden = [...productos].sort((a, b) => a.precio - b.precio);
    console.log("\n ORDENADOS POR PRECIO");
    orden.forEach(p => console.log(`${p.nombre} - $${p.precio}`));
}

function buscarProducto() {
    let nombre = prompt("Ingrese producto: ");
    let prod = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    console.log(prod ? `\n ${prod.nombre} - $${prod.precio}` : "\n❌ No encontrado");
}

function validaciones() {
    let hayAgotados = productos.some(p => p.stock === 0);
    let todosStock = productos.every(p => p.stock > 0);

    console.log("\n VALIDACIONES");
    console.log("¿Hay agotados?:", hayAgotados);
    console.log("¿Todos tienen stock?:", todosStock);
}

function clasificarPrecio(precio) {
    switch (true) {
        case (precio < 50000):
            return "Barato";
        case (precio < 200000):
            return "Medio";
        default:
            return "Caro";
    }
}

function reporteFinal() {
    let masCaro = productos.reduce((max, p) => p.precio > max.precio ? p : max);
    let masBarato = productos.reduce((min, p) => p.precio < min.precio ? p : min);
    let masVendido = productos.reduce((max, p) => p.ventas > max.ventas ? p : max);
    let totalInv = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    let totalVend = productos.reduce((acc, p) => acc + p.ventas, 0);
    let agotados = productos.filter(p => p.stock === 0).length;

    console.log("\n REPORTE FINAL");
    console.log("Más caro:", masCaro.nombre);
    console.log("Más barato:", masBarato.nombre);
    console.log("Más vendido:", masVendido.nombre);
    console.log("Inventario:", totalInv);
    console.log("Ventas:", totalVend);
    console.log("Agotados:", agotados);
}

// MENÚ PRINCIPAL

function menu() {
    let opcion;

    do {
        console.log(`
=========  MENÚ =========
1. Mostrar productos
2. Stock bajo
3. Agotados
4. Lista precios
5. Total inventario
6. Total ventas
7. Ordenar precios
8. Buscar producto
9. Validaciones
10. Reporte final
0. Salir
===========================
        `);

        opcion = parseInt(prompt("Seleccione opción: "));

        switch (opcion) {
            case 1: mostrarProductos(); break;
            case 2: stockBajo(); break;
            case 3: agotados(); break;
            case 4: listaPrecios(); break;
            case 5: totalInventario(); break;
            case 6: totalVentas(); break;
            case 7: ordenarPrecio(); break;
            case 8: buscarProducto(); break;
            case 9: validaciones(); break;
            case 10: reporteFinal(); break;
            case 0: console.log(" Saliendo..."); break;
            default: console.log(" Opción inválida");
        }

    } while (opcion !== 0);
}

menu();