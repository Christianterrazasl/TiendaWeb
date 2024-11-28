(function(){
    document.querySelector('#btnRegister').addEventListener('click', (e)=>{
        e.preventDefault();

        const inputNombre = document.querySelector('#nombre');
        const inputUsername = document.querySelector('#username');
        const inputContrasena = document.querySelector('#contrasena');
        const msgNombre = document.querySelector('#validationNombre');
        const msgUser = document.querySelector('#validationUser');
        const msgContrasena = document.querySelector('#validationContra');
        


        let hayError = false;
        if(inputNombre.value.trim() === ""){
            msgNombre.style.display='block';
            hayError=true;
        }
        if(inputUsername.value.trim() === ""){
            msgUser.style.display='block';
            hayError=true;
        }
        if(inputContrasena.value.trim() === ""){
            msgContrasena.style.display='block';
            hayError=true;
        }
        if(hayError)return;

        const usuario = {
            "nombre" : inputNombre.value,
            "username" : inputUsername.value,
            "contrasena" : inputContrasena.value
        }

        fetch('api/usuario/registerAdmin',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(usuario)
            }
        ).then((response) => {
            if(!response.ok){
                throw new Error (response.status)
            }
            return response.json();
        })
        .then((data)=> {
            if(!data){
                msgUser.innerHTML = "Usuario o contraseña son invalidos";
                msgUser.style.display='block';
                return;
            }
            localStorage.setItem("userInSession", JSON.stringify(data));
            document.location.href = "indexAdmin.html";
        })
        .catch((error) => {
            msgUser.innerHTML = "Usuario o contraseña son invalidos";
            msgUser.style.display='block';
            return;
        })



    })
})()