const contenedorProductos = document.querySelector('.contenedor-productos');
const carritoBtn = document.querySelector('.logo-carrito');
const carritoFront = document.querySelector('.carrito-front');
const carritoBack = document.querySelector('.carrito-back');
const cerrarCarrito = document.querySelector('.carrito-salir')



productos.forEach((producto) => {
  const div = document.createElement('DIV');

  // Usamos clases Bootstrap para que sea responsivo
  div.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4 producto";

  div.innerHTML = `
    <div class="card h-100">
      <img src="${producto.imagen}" class="card-img-top imagen-producto" alt="${producto.nombre}">
      <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="card-title mt-3">${producto.nombre}</h3>
        <p class="card-text precio-producto">$${producto.precio}</p>
        <a href="#" class="btn btn-success mt-auto btn-producto">Agregar al carrito</a>
      </div>
    </div>
  `;

  contenedorProductos.appendChild(div);
});

/*Abrir carrito*/
carritoBtn.addEventListener('click', () => {
  carritoFront.classList.remove('no-active');
  carritoBack.classList.remove('no-active');
});

/*Cerrar presionando X*/
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('carrito-salir')){
    carritoFront.classList.add('no-active');
    carritoBack.classList.add('no-active');
  }
});

/*Cerrar presionando el back*/ 
carritoBack.addEventListener('click', (e) => {
  /*Si presionamos el front, nos va a dar como target algun elemento hijo de ese div front, y no el back...*/
  if(e.target === carritoBack){
    carritoFront.classList.add('no-active');
    carritoBack.classList.add('no-active');
  }
});


/*Agregar productos al carrito al presionar el boton*/
const botonesAgregar = document.querySelectorAll('.btn-producto');
const cantidadCarrito = document.querySelector('.cantidad-carrito');
const precioTotalSpan = document.querySelector('.precio-total');
let carrito = [];
cargarCarrito();
renderizarCarrito();

function renderizarCarrito() {
  carritoFront.innerHTML = `
    <p class="carrito-salir">X</p>
    <h3>${carrito.length === 0 ? 'No se seleccionaron productos' : 'Productos seleccionados'}</h3>
  `;

  // Si el carrito está vacío, solo mostramos el encabezado y salimos
  if (carrito.length === 0) {
    cantidadCarrito.textContent = 0;
    return;
  }

  // Encabezado tipo tabla
  const encabezado = document.createElement('div');
  encabezado.classList.add('tabla-carrito', 'titulo');
  encabezado.innerHTML = `
    <p>Imagen</p>
    <p>Nombre</p>
    <p>Cant.</p>
    <p>Subtotal</p>
  `;
  carritoFront.appendChild(encabezado);

  // Listado de productos
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    cantidadTotal += producto.cantidad;

    const fila = document.createElement('div');
    fila.classList.add('tabla-carrito');

    fila.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>${producto.nombre}</p>
      <div class="cantidad-control">
        <button class="btn btn-sm btn-outline-secondary btn-restar" data-index="${index}">➖</button>
        <span class="cantidad-num">${producto.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-sumar" data-index="${index}">➕</button>
      </div>
      <p>$${subtotal}</p>
      <button class="btn btn-sm btn-outline-danger btn-eliminar" data-index="${index}">Eliminar</button>
    `;

    carritoFront.appendChild(fila);
  });

  // Botones ➕ y ➖
  const botonesSumar = carritoFront.querySelectorAll('.btn-sumar');
  const botonesRestar = carritoFront.querySelectorAll('.btn-restar');

  // 🔼 Recorremos todos los botones de "sumar" cantidad
  botonesSumar.forEach(btn => {
    // Agregamos un event listener a cada botón de sumar para que escuche el click
    btn.addEventListener('click', () => {
      // Obtenemos el índice del producto en el que se encuentra en el carrito desde el atributo data-index del botón
      const index = btn.getAttribute('data-index');

      // Aumentamos la cantidad del producto correspondiente en el carrito
      carrito[index].cantidad++;

      // Guardamos el carrito actualizado en localStorage
      guardarCarrito();
      // Volvemos a renderizar el carrito para que se vea reflejado el cambio en pantalla
      renderizarCarrito();
    });
  });

  // 🔽 Recorremos todos los botones de "restar" cantidad
  botonesRestar.forEach(btn => {
    // Agregamos un event listener a cada botón de restar para que escuche el click
    btn.addEventListener('click', () => {
      // Obtenemos el índice del producto desde el atributo data-index del botón
      const index = btn.getAttribute('data-index');

      // Disminuimos la cantidad del producto correspondiente en el carrito
      carrito[index].cantidad--;

      // Si la cantidad llega a 0 o menos, eliminamos el producto del carrito
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }

      // Guardamos el carrito actualizado en localStorage
      guardarCarrito();

      // Volvemos a renderizar el carrito para que se vea reflejado el cambio en pantalla
      renderizarCarrito();
    });
  });

  // Total y botón vaciar al final
  const contenedorFinal = document.createElement('div');
  contenedorFinal.classList.add('contenedor-final');
  contenedorFinal.style.marginTop = '3rem';
  contenedorFinal.style.textAlign = 'center';

  contenedorFinal.innerHTML = `
    <p class="parrafo-precio">Total: <span class="precio-total">$${total}</span></p>
    <button class="btn btn-danger btn-lg mt-3 btn-vaciar w-100 p-4 fs-4">🗑️ Vaciar carrito</button>
    <button class="btn btn-primary btn-lg mt-3 btn-finalizar w-100 p-4 fs-4">✅ Finalizar compra</button>
  `;

  carritoFront.appendChild(contenedorFinal);

  // Evento botón "Vaciar carrito"
  const btnVaciar = carritoFront.querySelector('.btn-vaciar');
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  });

  // Evento botón "Finalizar compra"
  const btnFinalizar = carritoFront.querySelector('.btn-finalizar');
  btnFinalizar.addEventListener('click', () => {
    alert("¡Gracias por tu compra, Genaro! 🛒🧾");
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  });

  // Evento botones "Eliminar producto"
  const botonesEliminar = carritoFront.querySelectorAll('.btn-eliminar');
  botonesEliminar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      carrito.splice(index, 1);
      guardarCarrito();
      renderizarCarrito();
    });
  });

  // Actualiza burbuja de cantidad
  cantidadCarrito.textContent = cantidadTotal;
}

//Agregar al carrito al presionar boton de Agregar un producto
botonesAgregar.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const productoSeleccionado = productos[index];
    console.log(productoSeleccionado)
    const existente = carrito.find(p => p.id === productoSeleccionado.id);
    console.log(existente)
    if (existente) {
      existente.cantidad++;
    } else {
      /*Si no existe en el carrito, lo agregamos y le damos una nueva propiedad al objeto, cantidad con valor 1*/
      carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }
    guardarCarrito();
    renderizarCarrito();
  });
});

//Guardar carrito actual
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Cargar carrito al recargar pagina.
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  } else {
    carrito = [];
  }
}

//Seccion Contacto
let alertTimeout;
const alertForm = document.querySelector('.form-alert');
const form = document.querySelector('.contact-form');
const reset = document.querySelector('.reset-btn');
const inputs = document.querySelectorAll('.verificar');
const parrafoAlert = document.querySelector('.parrafo-alert');
const verde = '#198754';
const orange = '#D62900';

let objForm = {
  nombre: '',
  apellido: '',
  email: '',
  mensaje: ''
}

inputs.forEach(input => {
  input.addEventListener('input', (e) => {
    objForm[e.target.name] = e.target.value;
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(Object.values(objForm).some(valor => valor.trim() === '')) {
    estilosMensaje(`${orange}`, 'Todos los campos son obligatorios')
    reenderizarMensaje();
  } else {
    estilosMensaje(`${verde}`, 'Mensaje enviado correctamente')
    reenderizarMensaje();
    form.reset();
    Object.keys(objForm).forEach(key => objForm[key] = '');
  }
})

function estilosMensaje(color, mensaje){
  alertForm.style.display = 'block';
  alertForm.style.background = `${color}`;
  parrafoAlert.textContent = `${mensaje}`;
}

function reenderizarMensaje(){
  clearTimeout(alertTimeout);

  alertTimeout  = setTimeout(() => {
    alertForm.style.display = 'none';
  }, 2000);
}

reset.addEventListener('click', (e) => {
  e.preventDefault();
  form.reset();
})
