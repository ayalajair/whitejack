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

//DOM
const ingreso = document.querySelector (`#ingreso`);
const nombre = document.querySelector (`#nombre`);
const bienvenida = document.querySelector (`#bienvenida`);
const inicio = document.querySelector (`#mensajeInicio`);
const botonInicio = document.querySelector(`#botonInicio`);
const botonReinicio = document.querySelector (`#botonReinicio`);
const cartasCasino = document.querySelector (`#cartasCasino`);
const cartasJugador = document.querySelector (`#cartasJugador`);
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

//Función para ver si el jugador se retira o no.
const retira = (sumavos, sumamesa) => {
    let marcha = true;
    while (marcha) {
        let sino = prompt (`Tenés ${sumavos} puntos, la casa tiene ${sumamesa}, querés sacar otra carta? (S/N)`)
        switch (sino) {
            case "s": 
                
                return true;
            case "S":
                return true;
            case "n":
                return false;
            case "N":
                return false;
            default:
                alert ("Ingrese una opción válida");
            }}}


//Función para decir si se ganó o no (arreglar)
const whiteJack = (sumaJugador, sumaCasa)=> {  
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
        ingreso.remove();
        inicioJuego ();
    }
}

//Función para determinar si se termina el juego o no. 
const terminar = () =>{
    let sigue = true;
    while (sigue){
        fin = prompt ("Quiere seguir jugando? (S/N)");
        switch (fin) {
            case "s":
                botonInicio.style.display= "block";
                return true;
            case "S":
                botonInicio.style.display= "block";
                return true;
            case "n":
                return false;
            case "N":
                return false;
            default:
                alert ("Ingrese una opción válida");
            }  }    
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

//Programa principal
bienvenidaUsuario ();
botonInicio.onclick = () => {
    inicio.remove();
    botonInicio.style.display = "none";
    let jugando = true;
    while (jugando) {
        //La partida sigue mientras el jugador no se retire
        //se empiezan a generar cartas aleatorias entre 1 y 10
        //Se invoca a la funcion sumar carta, y luego a la funcion retira para ver si el jugador se retira o no
        //Cuando la suma de las cartas es igual a 21 o mas termina el juego automaticamente
        let terminaJugador = true;
        let terminaMesa = true;
        while (terminaJugador || terminaMesa) {
            if (sumadorCartasCasino<=17) {
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
            if (sumadorCartasJugador >= 21)
                break;
            if (terminaJugador)
            terminaJugador = retira (sumadorCartasJugador, sumadorCartasCasino);
        }
    //se informa la cantidad de cartas ingresadas
    alert (`Ingresaste: ${contadorCartas} cartas.`);
//se llama a la funcion para ver si es whiteJack
    alert (whiteJack(sumadorCartasJugador, sumadorCartasCasino));

//Se crea un objeto con los datos de la jugada
const jugada1 = new Jugada (usuario, contadorCartas, sumadorCartasJugador);
//Se llama al método para guardar si se ganó o no
jugada1.esWhiteJack();
jugada1.resumen = jugada1.jugadas();
//Se guarda el objeto en el array
historialJugadas.push (jugada1);
//Se llama a la funcion terminar para ver si el juego continua
    jugando = terminar ();
    contadorCartas = 0;
    sumadorCartasJugador = 0;
    sumadorCartasCasino = 0;
    arrayCartasCasino = [];
    arrayCartasJugador = [];
}
    //Se llama a un funcion para hacer el informe final del total de partidas
    informeFinal (historialJugadas); 
};











