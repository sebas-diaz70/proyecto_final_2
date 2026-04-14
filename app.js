// ================= DATOS BASE =================
const productos = [
  { id: 1, nombre: "Mouse", categoria: "Periferico", precio: 50000, stock: 10, ventas: 12 },
  { id: 2, nombre: "Teclado", categoria: "Periferico", precio: 120000, stock: 5, ventas: 7 },
  { id: 3, nombre: "Monitor", categoria: "Pantalla", precio: 800000, stock: 2, ventas: 4 },
  { id: 4, nombre: "USB", categoria: "Accesorio", precio: 30000, stock: 0, ventas: 15 },
  { id: 5, nombre: "Diadema", categoria: "Audio", precio: 90000, stock: 8, ventas: 6 }
];

// ================= LIBRERÍA =================
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ================= FUNCIONES =================

function mostrarProductos() {
  console.log("\n LISTA DE PRODUCTOS:");
  console.table(productos);
}

function stockBajo() {
  const bajos = productos.filter(p => p.stock < 5 && p.stock > 0);
  console.log("\n STOCK BAJO:");
  console.table(bajos);
}

function productosAgotados() {
  const agotados = productos.filter(p => p.stock === 0);
  console.log("\n AGOTADOS:");
  console.table(agotados);
}

function nombresPrecios() {
  const lista = productos.map(p => `${p.nombre} - $${p.precio}`);
  console.log("\n LISTA:");
  console.log(lista);
}

function valorInventario() {
  const total = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  console.log("\n VALOR INVENTARIO:", total);
}

function totalVentas() {
  const total = productos.reduce((acc, p) => acc + p.ventas, 0);
  console.log("\n TOTAL VENTAS:", total);
}

function ordenarPrecio() {
  const ordenados = [...productos].sort((a, b) => a.precio - b.precio);
  console.log("\n ORDENADOS POR PRECIO:");
  console.table(ordenados);
}

function buscarProducto(callback) {
  rl.question(" Ingrese nombre: ", (nombre) => {
    const encontrado = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    console.log("\n RESULTADO:", encontrado || "No encontrado");
    callback();
  });
}

function verificaciones() {
  const hayAgotados = productos.some(p => p.stock === 0);
  const todosStock = productos.every(p => p.stock > 0);

  console.log("\n¿Hay agotados?:", hayAgotados);
  console.log("¿Todos tienen stock?:", todosStock);
}

function clasificarProducto(callback) {
  rl.question(" Nombre del producto: ", (nombre) => {
    const producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!producto) {
      console.log("Producto no encontrado");
      return callback();
    }

    let rango;
    switch (true) {
      case producto.precio < 50000:
        rango = "Económico";
        break;
      case producto.precio <= 150000:
        rango = "Medio";
        break;
      default:
        rango = "Alto";
    }

    console.log(`\n${producto.nombre} es ${rango}`);
    callback();
  });
}

function reporteFinal() {
  const masCaro = productos.reduce((a, b) => a.precio > b.precio ? a : b);
  const masBarato = productos.reduce((a, b) => a.precio < b.precio ? a : b);
  const masVendido = productos.reduce((a, b) => a.ventas > b.ventas ? a : b);
  const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  const totalVendidas = productos.reduce((acc, p) => acc + p.ventas, 0);
  const agotados = productos.filter(p => p.stock === 0).length;

  console.log("\n REPORTE FINAL:");
  console.log("Más caro:", masCaro);
  console.log("Más barato:", masBarato);
  console.log("Más vendido:", masVendido);
  console.log("Valor inventario:", valorTotal);
  console.log("Total vendidos:", totalVendidas);
  console.log("Productos agotados:", agotados);
}

// ================= MENÚ =================

function menu() {
  console.log(`
========= MENÚ =========
1. Ver productos
2. Stock bajo
3. Agotados
4. Lista nombres y precios
5. Valor inventario
6. Total ventas
7. Ordenar por precio
8. Buscar producto
9. Verificaciones
10. Clasificar producto
11. Reporte final
0. Salir
========================
`);

  rl.question(" Elige una opción: ", (opcion) => {
    switch (parseInt(opcion)) {
      case 1:
        mostrarProductos();
        return menu();

      case 2:
        stockBajo();
        return menu();

      case 3:
        productosAgotados();
        return menu();

      case 4:
        nombresPrecios();
        return menu();

      case 5:
        valorInventario();
        return menu();

      case 6:
        totalVentas();
        return menu();

      case 7:
        ordenarPrecio();
        return menu();

      case 8:
        return buscarProducto(menu);

      case 9:
        verificaciones();
        return menu();

      case 10:
        return clasificarProducto(menu);

      case 11:
        reporteFinal();
        return menu();

      case 0:
        console.log(" Saliendo...");
        rl.close();
        break;

      default:
        console.log(" Opción inválida");
        menu();
    }
  });
}

// INICIAR APP
menu();}

//  COMBINACIONES 

// 1. Stock > 0 ordenados por precio
function disponiblesOrdenados() {
  const resultado = productos
    .filter(p => p.stock > 0)
    .sort((a, b) => a.precio - b.precio);

  console.log(" DISPONIBLES ORDENADOS:", resultado);
}

// 2. Agotados con mensaje
function mensajesReabastecimiento() {
  const mensajes = productos
    .filter(p => p.stock === 0)
    .map(p => `Reabastecer ${p.nombre}`);

  console.log(" MENSAJES:", mensajes);
}

// 3. Dinero por vender todo el stock
function dineroPotencial() {
  const total = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  console.log(" DINERO POTENCIAL:", total);
}

// 4. Producto más vendido
function productoMasVendido() {
  const masVendido = [...productos].sort((a, b) => b.ventas - a.ventas)[0];
  console.log(" MÁS VENDIDO:", masVendido);
}

// ================= REPORTE FINAL =================

function reporteFinal() {
  const masCaro = productos.reduce((a, b) => a.precio > b.precio ? a : b);
  const masBarato = productos.reduce((a, b) => a.precio < b.precio ? a : b);
  const masVendido = productos.reduce((a, b) => a.ventas > b.ventas ? a : b);
  const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  const totalVendidas = productos.reduce((acc, p) => acc + p.ventas, 0);
  const agotados = productos.filter(p => p.stock === 0).length;

  console.log(" REPORTE FINAL:");
  console.log("Más caro:", masCaro);
  console.log("Más barato:", masBarato);
  console.log("Más vendido:", masVendido);
  console.log("Valor inventario:", valorTotal);
  console.log("Total vendidos:", totalVendidas);
  console.log("Productos agotados:", agotados);
}

// ================= MENÚ =================

let opcion;

while (opcion !== 0) {
  opcion = parseInt(prompt(`
1. Ver productos
2. Stock bajo
3. Agotados
4. Lista nombres y precios
5. Valor inventario
6. Total ventas
7. Ordenar por precio
8. Buscar producto
9. Verificaciones
10. Clasificar producto
11. Reporte final
0. Salir
`));

  switch (opcion) {
    case 1: mostrarProductos(); break;
    case 2: stockBajo(); break;
    case 3: productosAgotados(); break;
    case 4: nombresPrecios(); break;
    case 5: valorInventario(); break;
    case 6: totalVentas(); break;
    case 7: ordenarPrecio(); break;
    case 8:
      let nombre = prompt("Ingrese nombre:");
      buscarProducto(nombre);
      break;
    case 9: verificaciones(); break;
    case 10:
      let nom = prompt("Nombre del producto:");
      clasificarProducto(nom);
      break;
    case 11: reporteFinal(); break;
    case 0: console.log("Saliendo..."); break;
    default: console.log("Opción inválida");
  }
}
