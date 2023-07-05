/**
 * 2C = 2 de Tréboles
 * 2D = 2 de Diamantes
 * 2H = 2 de Corazones
 * 2S = 2 de Picas
 */

//Función anónima autoinvocada
//Patrón modulo
const miModulo = ( () => {
    'use strict'

    let baraja = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // referencias a DOM (Eventos Click botones)
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');

    const ref_small = document.querySelectorAll('small');
    const divCartasJugadores = document.querySelectorAll('.divCartas');

    //Esta funcion inicia el juego
    const inicializarJuego = (numJugadores = 2) => {

        baraja = crearBaraja();
        puntosJugadores = [];

        for(let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }

        ref_small.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    /**
     * Esta función crea la baraja de poker
     */
    const crearBaraja = () => {

        baraja = [];
        for(let i=2; i<=10; i++){
            for(let tipo of tipos){
                baraja.push(i + tipo);
            }
            
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                baraja.push(especial + tipo);
            }
        }

        return  _.shuffle(baraja); // baraja aleatoriamente la baraja de poker
        // console.log(baraja);

    }

    /**
     * Está función devuelve una carta al azar
     * @returns carta
     */
    const pedirCarta = () => {
        if(baraja.length === 0){
            throw 'No quedan cartas en la baraja';
        }
        
        return baraja.shift();
        //console.log(baraja);
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        if(isNaN( valor )){
            return (valor === 'A') ? 11 : 10;
        } else{ return valor * 1; }
    }

    //Turno 0  primer jugador, último turno siempre será turno de la computadora
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        ref_small[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Eventos *******
    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
    });

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta, 0);

        if(puntosJugador > 21 ){
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        else if ( puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true; 
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    const determinarGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout( () => {

            if( puntosComputadora === puntosMinimos){
                alert ('Nadie gana :(');
            } else if ( puntosMinimos > 21){
                alert('Computadora gana');
            } else if ( puntosComputadora>21){
                alert('Jugador gana');
            } else{
                alert('Computadora gana');
            }
        }, 100);
    }

    //Turno computadora
    const turnoComputadora = (puntosMinimos) =>{

        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while( (puntosComputadora<puntosMinimos) && puntosMinimos<=21);

        determinarGanador();
    }

    return {
        nuevoJuego: inicializarJuego
    };

})();

