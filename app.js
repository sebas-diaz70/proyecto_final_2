// ================= DATOS BASE =================
const productos = [
  { id: 1, nombre: "Mouse", categoria: "Periferico", precio: 50000, stock: 10, ventas: 12 },
  { id: 2, nombre: "Teclado", categoria: "Periferico", precio: 120000, stock: 5, ventas: 7 },
  { id: 3, nombre: "Monitor", categoria: "Pantalla", precio: 800000, stock: 2, ventas: 4 },
  { id: 4, nombre: "USB", categoria: "Accesorio", precio: 30000, stock: 0, ventas: 15 },
  { id: 5, nombre: "Diadema", categoria: "Audio", precio: 90000, stock: 8, ventas: 6 }
];

// ================= FUNCIONES =================

// 1. Mostrar todos los productos
function mostrarProductos() {
  console.log("LISTA DE PRODUCTOS:");
  productos.forEach(p => console.log(p));
}

// 2. Productos con stock bajo (<5)
function stockBajo() {
  const bajos = productos.filter(p => p.stock < 5 && p.stock > 0);
  console.log(" STOCK BAJO:", bajos);
}

// 3. Productos agotados
function productosAgotados() {
  const agotados = productos.filter(p => p.stock === 0);
  console.log(" AGOTADOS:", agotados);
}

// 4. Lista de nombres y precios
function nombresPrecios() {
  const lista = productos.map(p => `${p.nombre} - $${p.precio}`);
  console.log("💲 LISTA:", lista);
}

// 5. Valor total del inventario
function valorInventario() {
  const total = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  console.log(" VALOR INVENTARIO:", total);
}

// 6. Total ventas
function totalVentas() {
  const total = productos.reduce((acc, p) => acc + p.ventas, 0);
  console.log(" TOTAL VENTAS:", total);
}

// 7. Ordenar por precio
function ordenarPrecio() {
  const ordenados = [...productos].sort((a, b) => a.precio - b.precio);
  console.log(" ORDENADOS POR PRECIO:", ordenados);
}

// 8. Buscar producto
function buscarProducto(nombre) {
  const encontrado = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  console.log(" RESULTADO:", encontrado || "No encontrado");
}

// 9. Verificaciones
function verificaciones() {
  const hayAgotados = productos.some(p => p.stock === 0);
  const todosStock = productos.every(p => p.stock > 0);

  console.log("¿Hay agotados?:", hayAgotados);
  console.log("¿Todos tienen stock?:", todosStock);
}

// 10. Clasificación por precio
function clasificarProducto(nombre) {
  const producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

  if (!producto) {
    console.log("Producto no encontrado");
    return;
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

  console.log(` ${producto.nombre} es ${rango}`);
}

// ================= COMBINACIONES =================

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