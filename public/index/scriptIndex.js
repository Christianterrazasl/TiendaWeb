

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



