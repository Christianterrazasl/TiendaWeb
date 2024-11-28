
(async function() {
    const [btnLogin, btnRegister, msgUserInSession, btnCerrarSesion] = document.querySelectorAll('#btnLogin, #btnRegister, #msgUserInSession, #btnCerrarSesion');
    const btnComprar = document.querySelector('#btnComprar');
    const btnVaciar = document.querySelector('#btnVaciar');
    const carritoAnonimo = localStorage.getItem("carritoAnon");
    const userInSession = localStorage.getItem("userInSession");
    let carritoResult = [];
    btnComprar.style.display = 'none';

    if (userInSession) {
        btnLogin.style.display ='none';
        btnRegister.style.display ='none';
        btnCerrarSesion.style.display='block';
        btnComprar.style.display = 'block';

        btnLogin.addEventListener('click', ()=>{
            document.location.href='login.html';
        });
        btnRegister.addEventListener('click', ()=>{
            document.location.href='register.html';
        })

        


        if(carritoAnonimo){
            const carritoAnonInfo = JSON.parse(carritoAnonimo);
            const userInSessionInfo = JSON.parse(userInSession);

            carritoAnonInfo.forEach(elemento => {
                elemento.idusuario = userInSessionInfo.id;
            });
            
            const result = await fetch('api/usuario/carrito/anon', {
                method:'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(carritoAnonInfo)
            })
            if(result.ok){
                localStorage.removeItem("carritoAnon");
                
            }
        }

        carritoResult = await fetch('api/usuario/carrito/'+ JSON.parse(userInSession).id)
        .then(response => response.json())
        .then(data => data);
    


    }else{
        carritoResult = JSON.parse(carritoAnonimo);
    }
    

    const carritoProductos = [];
    carritoResult.forEach((producto)=>{
        let productoExistente = carritoProductos.find(p => p.idproducto === producto.idproducto);
        if(!productoExistente){
            productoExistente = {
                nombreproducto: producto.nombreproducto,
                username: producto.username,
                precio: producto.precio,
                idproducto: producto.idproducto,
                idusuario: producto.idusuario,
                cantidad: producto.cantidad
            }

            carritoProductos.push(productoExistente);
        }else{
            productoExistente.cantidad += producto.cantidad; 

        }

        
    });
    
    console.log(carritoProductos);

    const seccionItems = document.querySelector('#items'); 
    carritoProductos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className ='producto';
        productoDiv.innerHTML=
        `
        <p class="productoTitle">${producto.nombreproducto}</p>
        <p>Precio unitario: ${producto.precio} Bs.</p>
        <p class="preciosTotales">Precio total: ${producto.precio * producto.cantidad} Bs.</p>
        <div class="cantidadProducto">
            <p>Cantidad:</p>
            <input type="number" class="cantidadProductoInput" value=${producto.cantidad} data-idproducto=${producto.idproducto}>
        </div>
        <p class="msgError"></p>
        <input type="button" value="Eliminar" class="btnEliminar" data-idproducto = ${producto.id}>
        
        `;


        const inputCantidad = productoDiv.querySelector('.cantidadProductoInput');
        const precioTotalLabel = productoDiv.querySelector('.preciosTotales');
        const msgError = productoDiv.querySelector('.msgError');
        const btnEliminar = productoDiv.querySelector('.btnEliminar');
        

        inputCantidad.addEventListener('input', (event)=>{
            const nuevaCantidad = parseInt(event.target.value);
            if(isNaN(nuevaCantidad) || nuevaCantidad <= 0){
                msgError.innerHTML = 'Valor invalido';
            }
            
            precioTotalLabel.innerHTML = `Precio total: ${producto.precio * producto.cantidad} Bs.` 

            
        })

        btnEliminar.addEventListener('click', async (event)=>{
            
            
            if(userInSession){
                const obj = {
                    idusuario: JSON.parse(userInSession).id,
                    idproducto: event.target.dataset.idproducto
                }
                console.log(obj);
                await fetch('api/usuario/carrito/producto', {
                    method:'delete',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(obj)

                })
            }
            else if(carritoAnonimo){
                let carritoAnon = JSON.parse(localStorage.getItem('carritoAnon')) || [];
            
                carritoAnon = carritoAnon.filter(item => item.idproducto !== event.target.dataset.idproducto);
            
                localStorage.setItem('carritoAnon', JSON.stringify(carritoAnon));
            }

            productoDiv.remove();
            


        })


        seccionItems.appendChild(productoDiv);

    })

    const precioTotal = document.querySelector('#precioTotal');
    let acumuladorTotal = 0;
    carritoProductos.forEach(producto => {
        acumuladorTotal += producto.cantidad * producto.precio;
    })
    precioTotal.innerHTML = `Precio total: ${acumuladorTotal}`;

    
    btnVaciar.addEventListener('click', async ()=>{
        if(userInSession){
            await fetch('api/usuario/carrito/'+ JSON.parse(userInSession).id, {
                method:'delete',
                headers:{'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                }

            })

        }
        if(carritoAnonimo){
            localStorage.removeItem("carritoAnon");
        }
        document.location.href='carrito.html';
    });


    btnComprar.addEventListener('click', ()=>{
        const orden = fetch('api/usuario/orden', {
            method:'post',
            headers:{'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(carritoProductos)
        }).then(response => response.json())
        .then(data => data);

        if(orden){
            alert("Se agrego una orden");
            document.location.href='index.html';
        }

    })




})();   



