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

const carrusel = document.querySelector(".carrucelPopulares");
const btnDerechaCarrusel = document.querySelector("#btnNext");
const btnIzquierdaCarrusel = document.querySelector("#btnPrev");
const switchMenu = document.querySelector("#switchMenu");
const itemsEscondidos = document.querySelector(".esconder");

let indexCarrucelActual = 0;
const updateCarrucel= ()=> carrusel.style.transform = `translateX(${-indexCarrucelActual*100}vw)`;
let switchMenuValue = true;


btnDerechaCarrusel.addEventListener("click", ()=>{
    if (indexCarrucelActual < 3){
        indexCarrucelActual++;
        updateCarrucel();
    }
})

btnIzquierdaCarrusel.addEventListener("click", ()=>{
    if (indexCarrucelActual > 0){
        indexCarrucelActual--;
        updateCarrucel();
    }
})

switchMenu.addEventListener("click", ()=> {
    
    
    if(switchMenuValue) {
        itemsEscondidos.style.display= 'none';
        switchMenuValue = !switchMenuValue; 
    } else {
        itemsEscondidos.style.display= 'block';
        switchMenuValue = !switchMenuValue; 
    }
});



})();

function cerrarSesion(){
    localStorage.removeItem("userInSession");
    document.location.href='index.html';
}