(async function(){

    const userInSession = localStorage.getItem("userInSession");
    const [btnRegister, btnLogin, msgUser, btnCerrarSesion] = document.querySelectorAll('#btnRegister,#btnLogin,#msgUserInSession,#btnCerrarSesion');
    const userId = JSON.parse(userInSession).id;
    const seccionOrdenes = document.querySelector('#ordenes');

    btnRegister.style.display='none';
    btnLogin.style.display='none';
    msgUser.innerHTML='Bienvenido '+ JSON.parse(userInSession).username;
    btnCerrarSesion.style.display='block';

    btnCerrarSesion.addEventListener('click', ()=>{
        localStorage.removeItem("userInSession");
        document.location.href='index.html';
    })
    
    const ordenes = await fetch('/api/usuario/orden/'+ userId)
    .then(response => response.json())
    .then(data => data);

    const ordenesProductos=[];
    ordenes.forEach(row => {
        let ordenExistente = ordenesProductos.find( orden => orden.idorden === row.idorden);
        if(!ordenExistente){
            ordenExistente = {
                idorden : row.idorden,
                fechaorden : row.fechaorden,
                horaorden : row.horaorden,
                fechaentrega: row.fechaentrega,
                horaentrega: row.horaentrega,
                productos: []
            }
            ordenesProductos.push(ordenExistente);
        } 

        ordenExistente.productos.push({nombre : row.nombre, cantidad: row.cantidad, precio: row.precio});

    });

    ordenesProductos.forEach(orden =>{

        const ordenDiv = document.createElement('div');
        ordenDiv.className= 'orden';
        ordenDiv.innerHTML = `
        <p>Id de la orden: ${orden.idorden}</p>
        <div>
        <p>Hora de orden: ${orden.horaorden.split(".")[0]}</p>
        <p>Fecha de orden: ${orden.fechaorden.split("T")[0]}</p>
        <p>Hora de entrega: ${orden.horaentrega || "No entregado"}</p>
        <p>Fecha de entrega: ${orden.fechaentrega || "No entregado"}</p>
        </div>
        <div class="productos">
        Productos:
        ${getProductosHtml(orden.productos)}
        </div>
        `



        seccionOrdenes.appendChild(ordenDiv);

    } )


    
})()

function getProductosHtml(arrayProductos){
    let html ="";
    let acumulador = 0;
    arrayProductos.forEach(producto=>{
        const productoHtml = `
        <p>${producto.nombre}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        `
        html+= productoHtml;
        acumulador += producto.precio;
    })
    html+= `<h3>Precio total: ${acumulador} </h3>`
    return html;
}