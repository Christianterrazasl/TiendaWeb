(async function(){

    const btnIniciarSesion = document.querySelector('#iniciarSesion');
    const btnRegistrarse = document.querySelector('#registrarse');
    const mensajeUserInSession = document.querySelector('#mensajeUserInSession');
    const btnCerrarSesion = document.querySelector('#btnCerrarSesion');


    const userInSession = localStorage.getItem("userInSession");
    if(userInSession){
        const userInfo = JSON.parse(userInSession);
        

        
        btnCerrarSesion.style.display='block';
        mensajeUserInSession.innerHTML = `Bienvenido, ${userInfo.nombre}`;
        mensajeUserInSession.style.textTransform = 'uppercase';
        mensajeUserInSession.style.display='block';
        btnIniciarSesion.style.display='none';
        btnRegistrarse.style.display='none';


    }
    btnIniciarSesion.addEventListener('click', ()=> document.location.href = 'login.html');
    btnRegistrarse.addEventListener('click', ()=> document.location.href='register.html')

    
    const productos = await fetch('api/producto')
    .then(response => response.json())
    .then(data=>data)
    .catch((error) => {
        console.log(error);
        alert('Error al cargar productos');
    });

    const itemsContainer = document.querySelector('.itemsContainer');
    if(productos.length === 0){
        itemsContainer.innerHTML = "<p>No existen productos registrados</p>";
    }else{
        let productosHtml = '';
        productos.forEach(producto => {
            
            productosHtml += 
            `
                <article class="itemCatalogo">
                <img src="imagenes/ProductLogo.png" alt="producto">
                <h2 class="tituloItem">${producto.nombre} <br> ${producto.precio} Bs.</h2>
                <input type="button" value="Ver detalles" class="btnDetalles" onclick=verDetalles(${producto.id})>
                <input type="button" value="Comprar" class="btnComprar" onclick=anadirACarrito(${producto.id})>
                </article>
            `
        });
        itemsContainer.innerHTML = productosHtml;
    }
    

    btnCerrarSesion.addEventListener('click', cerrarSesion);



})();



function cerrarSesion(){
    localStorage.removeItem("userInSession");
    document.location.href='catalogo.html';
}

function verDetalles(productoId){
    
    document.location.href = `productoDetallado.html?id=${productoId}`;
}

async function anadirACarrito(productoId) {
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
                idproducto: productoId,
                cantidad: 1
            })
        });
        document.location.href = 'carrito.html';
    } else {
        
        const productoIdNumerico = parseInt(productoId, 10); 

        
        const producto = await fetch(`/api/producto/productoId/${productoIdNumerico}`)
            .then(response => response.json())
            .then(data => data);

        const carritoAnon = JSON.parse(localStorage.getItem("carritoAnon")) || [];

        
        const indexProducto = carritoAnon.findIndex(item => item.idproducto === productoIdNumerico);

        if (indexProducto !== -1) {
            
            carritoAnon[indexProducto].cantidad += 1;
        } else {
            
            carritoAnon.push({
                nombreproducto: producto.nombre,
                precio: producto.precio,
                idproducto: productoIdNumerico, 
                cantidad: 1
            });
        }

        
        localStorage.setItem("carritoAnon", JSON.stringify(carritoAnon));
        document.location.href = 'carrito.html';
    }
}




