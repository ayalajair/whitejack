//El programa es una especie de BlackJack, primero se le pide al usuario que ingrese su nickname o apodo
//Se le da la bienvenida.
//Luego se le pide al usuario que ingrese numeros de cartas entre el 1 y el 10.
//Se van sumando las cartas y el programa termina cuando se alcanza o se pasa el número 21.
//Luego de terminado el ciclo se informa la cantidad de cartas ingresadas.
//Si la suma da justo 21, se informa por alerta ¡White Jack!
//Si se pasa de 21, se informa por alerta: ¡Perdiste!
//Terminado el juego te pregunta si queres jugar otra vez
//Si aceptas arranca nuevamente el juego, Si no aceptas te muestra una lista de las jugadas realizadas
let sumadorCartas = 0;
let contadorCartas= 0;
let carta;
//Array que contendrá el historial de jugadas
const historialJugadas =[];
//Clase de los objetos que se almacenarán en el Array
class Jugada {
    constructor (usuario,cantCartas,puntaje){
        this.usuario = usuario;
        this.cantCartas = cantCartas;
        this.puntaje = puntaje;
//por defecto queda como que el usuario perdió
        this.resultado="Perdió";
        this.resumen
    }
//Metodo que se fija si el Usuario perdio o no, hay que ejecutar antes de guardar en el array
    whiteJack() {
        if (this.puntaje === 21)
        {
        this.resultado = "¡Ganó!";
        };
    };
    jugadas () {
        return `${this.usuario} scacó ${this.cantCartas} cartas, sumó ${this.puntaje} y ${this.resultado}`;
    }
};


//Función para el ingreso del nombre del jugador, si no ingresa nada le pide que lo ingrese otra vez.
const ingresoUsuario = () =>{
    let ingreso = true;
    let nick;
    while (ingreso) {
        nick = prompt ("Ingresá tu nickname: ");
        if (nick !=""){
            return nick;
        } 
        else {
            alert ("No ingresaste tu nombre, prueba otra vez.");
        }
    }
}
//Función sumar las cartas, realiza las operaciones pertinentes del ciclo.
const sumarCarta = (card) =>{
        sumadorCartas = sumadorCartas + card;
        contadorCartas++;
}

const retira = () => {
    let marcha = true;
    while (marcha) {
        let sino = prompt ("Querés sacar otra carta? (S/N")
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


//Función para decir si se ganó o no
const whiteJack = (sumador)=> {   
    if (sumador===21) {
        return "¡White Jack!";
    }else {
        return "¡Perdiste!";
    }
};
//Función para determinar si se termina el juego o no. 
const terminar = () =>{
    let sigue = true;
    while (sigue){
        fin = prompt ("Quiere seguir jugando? (S/N)");
        switch (fin) {
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
            }  }    
}

//Programa principal
let usuario = ingresoUsuario();
alert (`¡Hola ${usuario}, bienvenido al White Jack!`);
let jugando = true;
while (jugando) {
//La partida sigue mientras que la suma de las cartas sea menor a 21
//se empiezan a generar cartas aleatorias entre 1 y 10
//Se invoca a la funcion sumar carta, y luego a la funcion retira para ver si el jugador se retira o no
let termina = true;
    while (sumadorCartas<21 && termina) {
        carta = Math.floor((Math.random()*10)+1)
        alert (`Sacaste un ${carta}`);
        sumarCarta (carta);
        termina = retira ();
    }

    alert (`Ingresaste: ${contadorCartas} cartas.`);
    alert (whiteJack(sumadorCartas));


//Se crea un objeto con los datos de la jugada
    const jugada1 = new Jugada (usuario, contadorCartas, sumadorCartas);
//Se llama al método para guardar si se ganó o no
    jugada1.whiteJack();
//Se guarda el objeto en el array
    historialJugadas.push (jugada1);
//Se llama a la funcion terminar para ver si el juego continua
    jugando = terminar ();
    contadorCartas = 0;
    sumadorCartas = 0;
}
//Se muestra el Array en la consola con el historial de los juegos que el jugador realizó consecutivamente
//Se cuenta cuantas veces el jugador ganó y se informa
historialJugadas.forEach ( lista =>{
    console.log (`En esta jugada ${lista.jugadas()}`);
});
