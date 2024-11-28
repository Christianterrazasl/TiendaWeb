(async function(){
    const seccionProductos = document.querySelector('#productos');
    const seccionAdmins = document.querySelector('#administradores');
    const seccionCategorias = document.querySelector('#categorias');

    //Productos
    const productos = await fetch('api/producto/')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {console.error('Error al cargar los productos')});

    productos.forEach(p => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML= `
        <h4>${p.nombre}</h4>
        <h4>${p.descripcion}</h4>
        <input type="button" value="Eliminar" data-id=${p.id} class="btnEliminar">
        <input type="button" value="Editar" data-id=${p.id} class="btnEditar">

        `;

        productoDiv.querySelector('.btnEliminar').addEventListener('click', async (event)=>{
            const productoId = event.target.dataset.id;

            const response = await fetch('api/producto/categoria/'+ productoId, {
                method:'delete'
            });
            if(response.ok){
                productoDiv.remove();
            }

        })

        productoDiv.querySelector('.btnEditar').addEventListener('click', async (event)=>{
            const productoId = event.target.dataset.id;

            

        })

        seccionProductos.appendChild(productoDiv);
    });

    document.querySelector('#btnAgregarProducto').addEventListener('click', async ()=>{
       
    })

    
    //Categorias
    const categorias = await fetch('api/producto/categoria')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {console.error('Error al cargar las categorias')});

    

    categorias.forEach(c => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'categoria';
        categoriaDiv.innerHTML= `
        <h4>${c.nombre}</h4>
        <input type="button" value="Eliminar" data-id=${c.id} class="btnEliminar">
        `;

        categoriaDiv.querySelector('.btnEliminar').addEventListener('click', async (event)=>{
            const categoriaId = event.target.dataset.id;

            const response = await fetch('api/producto/categoria/'+ categoriaId, {
                method:'delete'
            });
            if(response.ok){
                categoriaDiv.remove();
            }

        })

        seccionCategorias.appendChild(categoriaDiv);
    });

    document.querySelector('#btnAgregarCategoria').addEventListener('click', async ()=>{
        const nombreCategoria = prompt("Agregue un nombre para la categoria: ");
        if(nombreCategoria){
            const reponse = await fetch('/api/producto/categoria', {
                method:'post',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ nombre: nombreCategoria })
            });
            document.location.href='indexAdmin.html';
        
        }
    });


    //ordenes
    const userId = JSON.parse(localStorage.getItem('userInSession')).id;
    const seccionOrdenes = document.querySelector('#ordenes');
    
    const ordenes = await fetch('/api/usuario/allOrdenes')
    .then(response => response.json())
    .then(data => data);

    const ordenesProductos=[];
    ordenes.forEach(row => {
        let ordenExistente = ordenesProductos.find( orden => orden.idorden === row.idorden);
        
        if(!ordenExistente){
            ordenExistente = {
                username: row.username,
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
        <div><p>Usuario: ${orden.username}</p></div>
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

    const checkboxMostrarOrdenes = document.querySelector('#mostrarOrdenes');
    const mostrarOrdenes = document.querySelectorAll('.orden');
    checkboxMostrarOrdenes.addEventListener('change', ()=>{
        if(checkboxMostrarOrdenes.checked){
            mostrarOrdenes.forEach(element => {
                element.style.display = 'block';
            });
        }
        else{
            mostrarOrdenes.forEach(element => {
                element.style.display = 'none';
            });
        }
    })


    //Cerrar Sesion
    document.querySelector('#btnCerrarSesion').addEventListener('click', ()=>{
        localStorage.removeItem("userInSession");
        document.location.href='login.html';
    })

    //admins
    const administradores = await fetch('/api/usuario/admins')
    .then(response => response.json())
    .then(data => data);

    administradores.forEach(admin => {
        const adminDiv = document.createElement('div');
        adminDiv.className ='administrador';
        adminDiv.innerHTML = 
        `
        <p>Id: ${admin.id}</p>
        <p>Username: ${admin.username}</p>
        <input class="btnEliminarAdmin" data-id=${admin.id} value=Eliminar>
        `
        ;

        adminDiv.querySelector('.btnEliminarAdmin').addEventListener('click', async (event)=>{
            const adminId = parseInt(event.target.dataset.id, 10);
            

            const respusta = await fetch('api/usuario/administradores/'+ adminId, {
                method: 'delete',
                headers:{'Content-Type':'application/json'}

            });

            if(respusta){
                adminDiv.remove()
            }
        })

        seccionAdmins.appendChild(adminDiv);
    })



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