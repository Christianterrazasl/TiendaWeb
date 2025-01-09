(function(){

const btnIniciarSesion = document.querySelector('#iniciarSesion');
const btnRegistrarse = document.querySelector('#registrarse');
const mensajeUserInSession = document.querySelector('#mensajeUserInSession');
const btnCerrarSesion = document.querySelector('#btnCerrarSesion');
const listaOrdenes = document.querySelector('#listaOrdenes');


const userInSession = localStorage.getItem("userInSession");
if(userInSession){
    const userInfo = JSON.parse(userInSession);
    

    
    btnCerrarSesion.style.display='block';
    mensajeUserInSession.innerHTML = `Bienvenido, ${userInfo.nombre}`;
    mensajeUserInSession.style.textTransform = 'uppercase';
    mensajeUserInSession.style.display='block';
    btnIniciarSesion.style.display='none';
    btnRegistrarse.style.display='none';
    listaOrdenes.style.display = 'block';


}


btnIniciarSesion.addEventListener('click', ()=> document.location.href = 'login.html');
btnRegistrarse.addEventListener('click', ()=> document.location.href='register.html')




})();

function cerrarSesion(){
    localStorage.removeItem("userInSession");
    document.location.href='index.html';
}