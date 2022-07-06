//El programa es una especie de BlackJack, primero se le pide al usuario que ingrese su nickname o apodo
//Se le da la bienvenida.
//Luego se le pide al usuario que saque cartas que estarán entre el 1 y el 10.
//Se van sumando las cartas y el programa termina cuando se alcanza o se pasa el número 21, o si el usuario se retiró.
//Luego de terminado el ciclo se informa la cantidad de cartas ingresadas.
//Si la suma da justo 21, se informa por alerta ¡White Jack!
//Si se pasa de 21, se informa por alerta: ¡Perdiste!
//Terminado el juego te pregunta si queres jugar otra vez
//Si aceptas arranca nuevamente el juego, Si no aceptas te muestra una lista de las jugadas realizadas

//**************************************Variables**********************************************************************************
let sumadorCartasJugador = 0;
let sumadorCartasCasino = 0;
let contadorCartas= 0;
let carta;
let arrayCartasJugador = [];
let arrayCartasCasino = [];
let usuario = JSON.parse(localStorage.getItem(`usuario`))
let terminaMesa;
let terminaJugador
let primeraVez = true ;

//**************************************DOM*****************************************************************************************
const ingreso = document.querySelector (`#ingreso`);
const nombre = document.querySelector (`#nombre`);
const bienvenida = document.querySelector (`#bienvenida`);
const botonInicio = document.querySelector(`#botonInicio`);
const botonReglas = document.querySelector(`#botonReglas`)
const botonReinicio = document.querySelector (`#botonReinicio`);
const cartasCasino = document.querySelector (`#cartasCasino`);
const cartasJugador = document.querySelector (`#cartasJugador`);
const seguirJugando = document.querySelector (`#seguirJugando`);
const botonSi = document.querySelector (`#botonSi`);
const botonNo = document.querySelector (`#botonNo`);
const resultadoFinal = document.querySelector (`#resultadoFinal`);
const botonSeguir = document.querySelector (`#seguir`);
const botonTerminar = document.querySelector (`#terminar`);
const verRanking = document.querySelector (`#verRanking`);
const botonRanking = document.querySelector (`#botonRanking`);
const mesa = document.querySelector (`#mesa`);
const tituloHistorial = document.querySelector (`#rondas`);
const volverHistorial = document.querySelector (`#volverHistorial`);
const botones = document.querySelector (`#botones`);
const jugadas = document.querySelector (`#jugadas`);
const ganados = document.querySelector (`#ganados`);

//Array que contendrá el historial de jugadas, primero se consulta en el LocalStorage si habia algo guardado anteriormente.
const historialJugadas =JSON.parse(localStorage.getItem(`historialJugadas`)) ||[];
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
            this.resultado = "No hizo WhiteJack";
        };
    };
    jugadas () {
        return `${this.usuario} sacó ${this.cantCartas} cartas, sumó ${this.puntaje} y ${this.resultado}`;
    }
};


//**********************Funcion Inicio juego*************************************************** */

//Funcion que genera el boton de inicio del juego
const inicioJuego = () => {
    botones.style.display = "flex";
    botones.style.border = "10px solid #E6BF25";
    botonInicio.style.display = "block";
    botonRanking.style.display = "block";
    botonReglas.style.display = "block";
}

//Funcion que inicializa el juego
const bienvenidaUsuario = () => {
    if (!!usuario){
        bienvenida.innerHTML = `Bienvenid@ ${usuario}!`;
        ingreso.style.display = "none";  
        inicioJuego ();
    }
    else {
        ingreso.onsubmit = (e) => {
            e.preventDefault ();
            usuario = nombre.value;
            localStorage.setItem('usuario', JSON.stringify(usuario));
            bienvenida.innerHTML = `Bienvenid@ ${usuario}!`;
            ingreso.style.display = "none";
            inicioJuego ();
        }
    }
}

//***********************************Funcion cargaJugada***************************************************************************** */

const cargaJugada = (u, contCard, sumCard) => {
    //Se crea un objeto con los datos de la jugada
const jugada1 = new Jugada (u, contCard, sumCard);
//Se llama al método para guardar si se ganó o no
jugada1.esWhiteJack();
jugada1.resumen = jugada1.jugadas();
//Se guarda el objeto en el array
historialJugadas.push (jugada1);
//Se guarda el historial el el LocalStorage
localStorage.setItem('historialJugadas', JSON.stringify(historialJugadas));
};
//******************************Funcion que borra las cartas de pantalla******************************** */
const borrarCartas = () => {
    cartasJugador.innerHTML = ``;
    cartasCasino.innerHTML= ``;
}
//********************************************Funcion Borrar Historial********************************************************** */
const borrarHistorial = () => {
    inicioJuego ();
    tituloHistorial.innerHTML= (``);
    jugadas.innerHTML=(``);
    ganados.innerHTML=(``)
    volverHistorial.style.display = "none";
}

//************************************************Funcion informeFinal***********************************************************
//Función que realiza el informe final del total de las partidas
const informeFinal = (informe)=> {
//Se cuenta cuantas veces el jugador ganó y se informa
botones.style.border = "none";
botonInicio.style.display= "none";
botonRanking.style.display= "none";
tituloHistorial.innerHTML = (`Historial de Jugadas: `);
volverHistorial.style.display = "block";
volverHistorial.onclick = ()=> borrarHistorial ();
for (element of informe) {
    let jugada = document.createElement (`li`);
    jugada.innerHTML = `En esta jugada ${element.resumen}`
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

//**********************************Función terminar*************************************************************************** */
//Función para determinar si se termina el juego o no. 
const terminar = () =>{
    botonTerminar.style.display= "inline";
    botonTerminar.onclick = () => {
        Swal.fire({
            title: 'Estás seguro que querés salir del juego?',
            showClass: { 
                popup: 'animate__animated animate__fadeInDown'},
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'},
            icon: 'warning',
            background: '#335918',
            color: '#fff', 
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, quiero terminar!',
            cancelButtonText: 'No, quiero quedarme!'
            
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Adiós',
                    text: 'Nos vemos la próxima.',
                    icon: 'success', 
                    background: '#335918',
                    color: '#fff',
                    confirmButtonColor: '#000',
                    }
                )
                borrarCartas();
                ingreso.style.display = "block";
                bienvenida.innerHTML =``;
                seguirJugando.innerHTML= ``;
                resultadoFinal.innerHTML= ``;
                botonTerminar.style.display= "none";
                mesa.style.display= "none";
                bienvenidaUsuario();
            }
        }) 
        
    }       
}
//***************************************Funcion que Imprime Carta*******************************************************************
const imprimeCarta = (card) => {
    const contenedorCarta = document.createElement (`div`);
    contenedorCarta.classList.add (`contenedorCarta`)
    contenedorCarta.id = `contenedorCarta`;
    contenedorCarta.innerHTML = `
    <div id="carta" class="marcoCarta">
    <div class="fondoCarta">
        <div class="fondoNumero">
            <h3 class="numeroCarta">${card}</h3>
        </div>
    </div>
    </div>`
    return contenedorCarta
}
//***********************************Funcion que genera la carta***************************** */
const sacaCarta = (turno) => {
    let carta = Math.floor((Math.random()*10)+1);
    turno == 1? cartasCasino.appendChild(imprimeCarta(carta)) : cartasJugador.appendChild(imprimeCarta(carta));
    turno =" "
    return carta
}
//***********************************Función Retira************************************************************************ */
//Función para ver si el jugador se retira o no.
const retira = (sumavos, sumamesa) => {
        seguirJugando.innerHTML =  `<p>Tenés ${sumavos} puntos, la casa tiene ${sumamesa}, querés sacar otra carta? </p>`
        botonSi.style.display = "inline";
        botonNo.style.display = "inline";
        botonSi.onclick = () => {
            botonSi.style.display = "none";
            botonNo.style.display = "none";
            juego();
            };
        botonNo.onclick = () => {
            botonSi.style.display = "none";
            botonNo.style.display = "none";
            while (sumamesa < 17){
                sumamesa += sacaCarta(1); 
                //arrayCartasCasino.push (carta);                    
            }
            seguirJugando.innerHTML =  `<p>Tenés ${sumavos} puntos, la casa sacó ${sumamesa}</p>`
            const resultado = whiteJack(sumavos, sumamesa);
            resultadoFinal.innerHTML = `<h3>${resultado}</h3>`;
            cargaJugada(usuario, contadorCartas, sumadorCartasJugador)
                
            contadorCartas = 0;
            sumadorCartasJugador = 0;
            sumadorCartasCasino = 0;
            terminar();
            };   
};


//Función para decir si se ganó o no
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

//Funcion del Juego 
const juego = ()=> {
    mesa.style.display = "flex";
    if (primeraVez){
        sumadorCartasCasino += sacaCarta(1);
        //arrayCartasCasino.push (carta);
        sumadorCartasJugador += sacaCarta(2);
        contadorCartas ++;
        //arrayCartasJugador.push (carta);
        primeraVez = false;
    }
    if (sumadorCartasCasino<=17) {
        sumadorCartasCasino += sacaCarta(1);
        //arrayCartasCasino.push (carta);
    }
    if (terminaJugador){
        sumadorCartasJugador += sacaCarta(2);
        contadorCartas ++;
        //arrayCartasJugador.push (carta);
    }
    if (sumadorCartasJugador >= 21 ){
        resultado = whiteJack(sumadorCartasJugador, sumadorCartasCasino);
        resultadoFinal.innerHTML = `<h3>${resultado}</h3>`;
        cargaJugada(usuario, contadorCartas, sumadorCartasJugador);
        contadorCartas = 0;
        sumadorCartasJugador = 0;
        sumadorCartasCasino = 0;
        primeraVez = true;
        terminar();
        return;
    }
    retira(sumadorCartasJugador, sumadorCartasCasino);           
} 

//Programa principal
bienvenidaUsuario ();
botonInicio.onclick = () => {
    botones.style.border = "none";
    botonInicio.style.display = "none";
    botonRanking.style.display= "none";
        terminaJugador = true;
        terminaMesa = true;
        juego ();    
    arrayCartasCasino = [];
    arrayCartasJugador = [];

};
botonReglas.onclick =() => {
    Swal.fire({
        title: 'White Jack',
        html: '<p class="popUp">El principal objetivo del juego es ganarle al Casino. Cómo lo haces? Muy fácil, obteniendo una mano que sea mas alta que la de la banca, pero que sea menor a 21. O bien, puedes ganar con una puntuación inferior a 22 cuando la mano de la banca supera los 21 puntos.<br>Cuando el valor total de tu mano es de 22 o más, esto se conoce comúnmente como "bancarrota", y automáticamente perderás.Cuando se te indique, puedes pedir cartas para tu mano, para incrementar el valor total. Mientras vas agregando cartas a tu mano, la banca completará su mano.<br>No es para sorprenderse que la mejor mano en el Whitejack se conozca como "Whitejack" que es cuando tus cartas o las de la banca suman 21. </p>',
        background: '#335918',
        color: '#fff',
        confirmButtonColor: '#000',
        confirmButtonText:  'Ya se jugar!',
    })
}
botonRanking.onclick = () => {
    informeFinal (historialJugadas);
};












