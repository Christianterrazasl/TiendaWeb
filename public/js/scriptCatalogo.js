(function(){

    const btnIniciarSesion = document.querySelector('#iniciarSesion');
    const btnRegistrarse = document.querySelector('#registrarse');
    const mensajeUserInSession = document.querySelector('#mensajeUserInSession');
    const btnCerrarSesion = document.querySelector('#btnCerrarSesion');


    const userInSession = localStorage.getItem("userInSession");
    if(userInSession){
        const userInfo = JSON.parse(userInSession);
        console.log('Usuario en sesion iniciada');

        
        btnCerrarSesion.style.display='block';
        mensajeUserInSession.innerHTML = `Bienvenido, ${userInfo.nombre}`;
        mensajeUserInSession.style.textTransform = 'uppercase';
        mensajeUserInSession.style.display='block';
        btnIniciarSesion.style.display='none';
        btnRegistrarse.style.display='none';


    }
    btnIniciarSesion.addEventListener('click', ()=> document.location.href = 'login.html');
    btnRegistrarse.addEventListener('click', ()=> document.location.href='register.html')

    
    cargarProductos();





})();

function cargarProductos(){
    fetch('api/producto')
    .then((response) => response.json())
    .then((data)=>{ mostrarProductos(data)})
    .catch((error) => {
        console.log(error);
        alert('Error al cargar productos');
    });
}

function mostrarProductos(arrayProductos){
    
    const itemsContainer = document.querySelector('.itemsContainer');
    itemsContainer.innerHTML = "";
    if(arrayProductos.length === 0){
        itemsContainer.innerHTML = "<p>No existen productos registrados</p>";
    }

    let htmlResultado = ""
    for(const producto of arrayProductos){
        let productoHtml = getProductoHtml(producto);
        htmlResultado += productoHtml;

    }
    itemsContainer.innerHTML = htmlResultado;
}

function getProductoHtml(producto){

    return `<article class="itemCatalogo">
                <img src="imagenes/ProductLogo.png" alt="producto">
                <h2 class="tituloItem">${producto.nombre} <br> ${producto.precio} Bs.</h2>
                <input type="button" value="Ver detalles" class="btnDetalles" onclick=verDetalles(${producto.id})>
                <input type="button" value="Comprar" class="btnComprar">
            </article>` 
}

function cerrarSesion(){
    localStorage.removeItem("userInSession");
    document.location.href='catalogo.html';
}

function verDetalles(productoId){
    document.location.href = `productoDetallado.html?id=${productoId}`;
}


