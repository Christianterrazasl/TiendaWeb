(async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    


    const producto = await fetch('api/producto/productoId/' + productId)
        .then(response => {
            
            return response.json();
        })
        .then(data => {
            mostrarProducto(data);
            return data;
        })
        .catch(error => {
            console.error(error);
            document.body.innerHTML = '<p>Producto no encontrado</p>';
        });

    
    document.querySelector('.btnCompra').addEventListener('click', () => {
        const cantidadInput = document.querySelector('.cantidad');
        const cantidad = parseInt(cantidadInput.value);

        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, introduce una cantidad válida.');
            return;
        }

        anadirACarrito(producto, cantidad);

        
    });
})();


function mostrarProducto(producto) {
    document.querySelector('.datosProducto').innerHTML = `
        <h1 class="tituloProducto">${producto.nombre}</h1>
        <img src="imagenes/ProductLogo.png" alt="imagen del producto" class="imagenProducto">
        <p class="descrProducto">${producto.descripcion}</p>
        <h2 class="tituloEspecificaciones">Especificaciones</h2>
        <ul class="listaEsp">
            <li>Marca: ${producto.marca}</li>
            <li>Categoría: ${producto.categoria}</li>
            <li>Precio: $${producto.precio}</li>
            <li>Cantidad en stock: ${producto.stock}</li>
        </ul>
    `;
}


async function anadirACarrito(producto, cantidad) {
    
    const userInSession = JSON.parse(localStorage.getItem("userInSession"));
    
    if (userInSession) {
        
        await fetch('/api/usuario/carrito/producto', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idusuario: userInSession.id,
                idproducto: producto.id,
                nombreproducto: producto.nombre,
                cantidad: cantidad,
                precio: producto.precio
            })
        });
        document.location.href = 'carrito.html';
    } else {
        
        const carritoAnon = JSON.parse(localStorage.getItem("carritoAnon")) || [];

        
        const indexProducto = carritoAnon.findIndex(item => item.idproducto === producto.id);

        if (indexProducto !== -1) {
            
            carritoAnon[indexProducto].cantidad += cantidad;
        } else {
            
            carritoAnon.push({
                idproducto: producto.id,
                nombreproducto: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad
            });
        }

        
        localStorage.setItem("carritoAnon", JSON.stringify(carritoAnon));
        document.location.href = 'carrito.html';
    }
}

