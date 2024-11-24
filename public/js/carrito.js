(function(){
    const [btnLogin, btnRegister, msgUserInSession, btnCerrarSesion] = document.querySelectorAll('#btnLogin, #btnRegister, #msgUserInSession, #btnCerrarSesion');
    const userInSession = JSON.parse(localStorage.getItem("userInSession"));
    if(userInSession){

        btnLogin.style.display='none';
        btnRegister.style.display='none';
        msgUserInSession.innerHTML = "Bienvenido, "+ userInSession.nombre;
        msgUserInSession.style.display='block';
        btnCerrarSesion.style.display='block';



    }

    btnCerrarSesion.addEventListener('click', ()=>{
        localStorage.removeItem("userInSession");
        document.location.href="carrito.html";
    });

    btnLogin.addEventListener('click', ()=>{
        document.location.href="login.html";
    });
    btnRegister.addEventListener('click', ()=>{
        document.location.href="register.html";
    });


    fetch('api/')

})();

function cargarItems(){
    const carritoAnonimo = JSON.parse(localStorage.getItem("carritoAnon"));
    const carritoResultante = [];
    const items = document.querySelector('#items');
    if(userInSession){
         
    }



}