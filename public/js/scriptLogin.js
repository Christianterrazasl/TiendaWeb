(function(){
    document.querySelector('#btnLogin').addEventListener('click', (e)=>{
        e.preventDefault();

        const inputUsername = document.querySelector('#username');
        const inputContrasena = document.querySelector('#contrasena');
        const msgUser = document.querySelector('#validationUser');
        const msgContrasena = document.querySelector('#validationContra');


        let hayError = false;
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
            "username" : inputUsername.value,
            "contrasena" : inputContrasena.value
        }

        fetch('api/usuario/login',
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
            document.location.href = "index.html";
        })
        .catch((error) => {
            msgUser.innerHTML = "Usuario o contraseña son invalidos";
            msgUser.style.display='block';
            return;
        })



    })
})()