// Declaración de productos
const productos = [
  { id: 1, nombre: "Granola", precio: 1200 },
  { id: 2, nombre: "Harina de Almendras", precio: 2500 },
  { id: 3, nombre: "Semillas de Chía", precio: 900 },
  { id: 4, nombre: "Mantequilla de maní", precio: 1800 },
];

// Carrito
let carrito = [];

// Función para mostrar productos
function mostrarProductos() {
  let mensaje = "Productos disponibles:\n";
  for (let i = 0; i < productos.length; i++) {
    mensaje += `${productos[i].id}. ${productos[i].nombre} - $${productos[i].precio}\n`;
  }
  alert(mensaje);
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
  let otroProducto = true;

  while (otroProducto) {
    mostrarProductos();
    let idProducto = parseInt(prompt("Ingrese el ID del producto que desea agregar al carrito:"));
    let productoSeleccionado = productos.find((p) => p.id === idProducto);

    if (productoSeleccionado) {
      carrito.push(productoSeleccionado);
      alert(`${productoSeleccionado.nombre} fue agregado al carrito.`);
    } else {
      alert("Producto no encontrado. Por favor, intente nuevamente.");
    }

    otroProducto = confirm("¿Deseás agregar otro producto?");
  }
}

// Función para mostrar el total de la compra
function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let mensaje = "El carrito contiene:\n";
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    mensaje += `${i + 1}. ${carrito[i].nombre} - $${carrito[i].precio}\n`;
    total += carrito[i].precio;
  }

  mensaje += `\nTotal de la compra: $${total}`;
  alert(mensaje);
}

// Llamadas a las funciones (flujo del programa)
alert("¡Bienvenido/a a El Despacho Natural!");
agregarAlCarrito();
mostrarCarrito();
