//El programa es una especie de BlackJack, primero se le pide al usuario que ingrese su nickname o apodo
//Se le da la bienvenida.
//Luego se le pide al usuario que saque cartas que estarán entre el 1 y el 10.
//Se van sumando las cartas y el programa termina cuando se alcanza o se pasa el número 21, o si el usuario se retiró.
//Luego de terminado el ciclo se informa la cantidad de cartas ingresadas.
//Si la suma da justo 21, se informa por alerta ¡White Jack!
//Si se pasa de 21, se informa por alerta: ¡Perdiste!
//Terminado el juego te pregunta si queres jugar otra vez
//Si aceptas arranca nuevamente el juego, Si no aceptas te muestra una lista de las jugadas realizadas

//Variables
let sumadorCartasJugador = 0;
let sumadorCartasCasino = 0;
let contadorCartas= 0;
let carta;
let arrayCartasJugador = [];
let arrayCartasCasino = [];
let usuario
let terminaMesa;
let terminaJugador

//DOM
const ingreso = document.querySelector (`#ingreso`);
const nombre = document.querySelector (`#nombre`);
const bienvenida = document.querySelector (`#bienvenida`);
const inicio = document.querySelector (`#mensajeInicio`);
const botonInicio = document.querySelector(`#botonInicio`);
const botonReinicio = document.querySelector (`#botonReinicio`);
const cartasCasino = document.querySelector (`#cartasCasino`);
const cartasJugador = document.querySelector (`#cartasJugador`);
const seguirJugando = document.querySelector (`#seguirJugando`);
const botonSi = document.querySelector (`#botonSi`);
const botonNo = document.querySelector (`#botonNo`);
const resultadoFinal = document.querySelector (`#resultadoFinal`);
const botonSeguir = document.querySelector (`#seguir`);
const botonTerminar = document.querySelector (`#terminar`);
//Array que contendrá el historial de jugadas
const historialJugadas =[];
//Clase de los objetos que se almacenarán en el Array
class Jugada {
    constructor (usuario,cantCartas,puntaje){
        this.usuario = usuario;
        this.cantCartas = cantCartas;
        this.puntaje = puntaje;
//por defecto queda como que el usuario perdió
        this.resultado="Se retiró";
        this.resumen
    }

//Metodo que se fija si el Usuario perdio o no, hay que ejecutar antes de guardar en el array
    esWhiteJack() {
        if (this.puntaje === 21){
        this.resultado = "¡Ganó!";
        }
        else if (this.puntaje >= 21){
            this.resultado = "Perdió";
        };
    };
    jugadas () {
        return `${this.usuario} sacó ${this.cantCartas} cartas, sumó ${this.puntaje} y ${this.resultado}`;
    }
};

const cargaJugada = (u, contCard, sumCard) => {
    //Se crea un objeto con los datos de la jugada
const jugada1 = new Jugada (u, contCard, sumCard);
//Se llama al método para guardar si se ganó o no
jugada1.esWhiteJack();
jugada1.resumen = jugada1.jugadas();
//Se guarda el objeto en el array
historialJugadas.push (jugada1);
};


//Función que realiza el informe final del total de las partidas
const informeFinal = (informe)=> {
    //Se muestra el Array en la consola con el historial de los juegos que el jugador realizó consecutivamente
//Se cuenta cuantas veces el jugador ganó y se informa
const tituloHistorial = document.querySelector (`#rondas`);
tituloHistorial.innerHTML = (`Historial de Jugadas: `);
const jugadas = document.querySelector (`#jugadas`);
for (element of informe) {
    let jugada = document.createElement (`li`);
    jugada.innerHTML = `En esta jugada ${element.jugadas()}`
    jugadas.append(jugada);
}
//Se filtran las partidas ganadas, se guardan en un array y se contabilizan
const ganadas = informe.filter(jugada => jugada.puntaje === 21);
const ganados = document.querySelector (`#ganados`);
const cuentaJuegos = document.createElement (`p`);
cuentaJuegos.innerHTML = `Ganaste ${ganadas.length} juego/s`;
ganados.append (cuentaJuegos);
//Se suman todos los puntajes de las jugadas, se guardan en un array y se informan
const totalPuntaje = informe.reduce((total, jugada) => total + jugada.puntaje,0);
const muestraPuntaje = document.createElement (`h3`);
muestraPuntaje.innerHTML = `Sumaste ${totalPuntaje} puntos`;
ganados.append (muestraPuntaje);
}
//Función para determinar si se termina el juego o no. 
const terminar = () =>{
    botonSeguir.style.display= "inline";
    botonTerminar.style.display= "inline";
    botonSeguir.onclick = () => {
        botonTerminar.style.display= "none";
        botonSeguir.style.display="none";
        ingreso.style.display = "block";
        bienvenida.innerHTML =``;
        cartasCasino.innerHTML = `<h2>Casino</h2>`;
        cartasJugador.innerHTML= `<h2>Tus cartas</h2>`
        seguirJugando.innerHTML= ``;
        resultadoFinal.innerHTML= ``;
        bienvenidaUsuario();
    }
    botonTerminar.onclick = () => { 
        informeFinal (historialJugadas);
        botonTerminar.style.display= "none";
        botonSeguir.style.display="none";
    }       
}

//Función para ver si el jugador se retira o no.
const retira = (sumavos, sumamesa) => {
        seguirJugando.innerHTML =  `<p>Tenés ${sumavos} puntos, la casa tiene ${sumamesa}, querés sacar otra carta? </p>`
        botonSi.style.display = "inline";
        botonNo.style.display = "inline";
       // let retirar;
    //    while (retirar) {
            botonSi.onclick = () => {
                botonSi.style.display = "none";
                botonNo.style.display = "none";
                juego();
                };
            botonNo.onclick = () => {
                botonSi.style.display = "none";
                botonNo.style.display = "none";
                terminaJugador = false;
                const resultado = whiteJack(sumavos, sumamesa);
                resultadoFinal.innerHTML = `<h3>${resultado}</h3>`;
                cargaJugada(usuario, contadorCartas, sumadorCartasJugador)
                contadorCartas = 0;
                sumadorCartasJugador = 0;
                sumadorCartasCasino = 0;
                terminar();
            };   
      //  }
};


//Función para decir si se ganó o no (arreglar)
const whiteJack = (sumaJugador, sumaCasa)=> { 
    seguirJugando.innerHTML =  `<p>Sacaste ${sumaJugador} puntos, la casa tiene ${sumaCasa} puntos</p>` 
    if (sumaJugador>21)
        return "¡Perdiste!"
    else if ((sumaJugador===21) && (sumaCasa !== 21) ) 
        return "¡Ganaste! ¡White Jack!";
    else if ((sumaJugador===21) && (sumaCasa === 21)) 
        return "¡Empate!";
    else if ((sumaJugador !== 21) && (sumaCasa === 21))
        return "¡Perdiste!";
    else if ((sumaJugador<21) && (sumaCasa > 21)) 
        return "¡Ganaste!";
    else if (sumaJugador>sumaCasa)
        return "¡Ganaste!";
    else 
        return "¡Perdiste!";
};





const inicioJuego = () => {
    inicio.innerHTML = `Para empezar el Juego, hace click en el botón <b>Empezar</b>`;
    botonInicio.style.display = "block";
}

//Funcion que inicializa el juego
const bienvenidaUsuario = () => {

    ingreso.onsubmit = (e) => {
        e.preventDefault ();
        usuario = nombre.value;
        bienvenida.innerHTML = `Bienvenid@ ${usuario}!`;
        ingreso.style.display = "none";
        inicioJuego ();
    }
}



//Funcion que Imprime Carta
const imprimeCarta = (card) => {
    const contenedorCarta = document.createElement (`div`);
    contenedorCarta.classList.add (`contenedorCarta`)
    contenedorCarta.id = `contenedorCarta`;
    contenedorCarta.innerHTML = `
        <div id="carta">
            <h3>${card}</h3>
        </div>`;
    return contenedorCarta
}
//Funcion del Juego 
const juego = ()=> {
    if (sumadorCartasCasino<=17 && terminaMesa) {
        carta = Math.floor((Math.random()*10)+1);
        cartasCasino.appendChild (imprimeCarta(carta));
        sumadorCartasCasino = carta + sumadorCartasCasino
        //alert (`La casa sacó ${carta}`)
        arrayCartasCasino.push (carta);
    }
    else {
        terminaMesa = false;
    }
    if (terminaJugador){
        carta = Math.floor((Math.random()*10)+1);
        cartasJugador.appendChild (imprimeCarta(carta));
        arrayCartasJugador.push (carta);
        contadorCartas ++;
        sumadorCartasJugador = carta + sumadorCartasJugador;
    }
    if (sumadorCartasJugador >= 21 || (!terminaJugador && !terminaMesa)){
        resultado = whiteJack(sumadorCartasJugador, sumadorCartasCasino);
        resultadoFinal.innerHTML = `<h3>${resultado}</h3>`;
        cargaJugada(usuario, contadorCartas, sumadorCartasJugador);
        contadorCartas = 0;
        sumadorCartasJugador = 0;
        sumadorCartasCasino = 0;
        terminar();
        return;
    }
    if (terminaJugador)
    retira(sumadorCartasJugador, sumadorCartasCasino);           
} 

//Programa principal
bienvenidaUsuario ();
botonInicio.onclick = () => {
    inicio.innerHTML = "";
    botonInicio.style.display = "none";
        terminaJugador = true;
        terminaMesa = true;
        juego ();    
    arrayCartasCasino = [];
    arrayCartasJugador = [];
//}
    //Se llama a un funcion para hacer el informe final del total de partidas
};











