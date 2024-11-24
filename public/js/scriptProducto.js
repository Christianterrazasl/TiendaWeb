(function(){

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    let producto; 
    fetch('api/producto/'+ productId)
    .then((response) =>{
        if(!response.ok){
            throw new Error('No se pudo obtener el producto');
        }
        return response.json();
    })
    .then( data =>{

        mostrarProducto(data);
        producto = data;
    })
    .catch(error => {
        console.error(error);
        document.body.innerHTML='<p>Producto no encontrado</p>'
    })

    document.querySelector('.btnCompra').addEventListener('click', ()=> {
        const cantidad = document.querySelector('.cantidad').value;
        anadirACarrito(producto, cantidadComprada);
    })

})()


function mostrarProducto(producto){
    document.querySelector('.datosProducto').innerHTML=
    `   
        <h1 class="tituloProducto">${producto.nombre}</h1>
        <img src="imagenes/ProductLogo.png" alt="imagen del producto" class="imagenProducto">
        <p class="descrProducto">${producto.descripcion}</p>
        <h2 class="tituloEspecificaciones"> Escpecificaciones</h2>
        <ul class="listaEsp">
            <li>Marca: ${producto.marca}</li>
            <li>Categoria: ${producto.categoria}</li>
            <li>Precio: ${producto.precio}</li>
            <li>Cantidad en stock: ${producto.stock}</li>

        </ul>
    `;
}

function anadirACarrito(prodcuto, cantidad){
    //llenar despues
}


