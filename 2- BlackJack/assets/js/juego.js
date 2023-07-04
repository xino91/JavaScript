/**
 * 2C = 2 de Tréboles
 * 2D = 2 de Diamantes
 * 2H = 2 de Corazones
 * 2S = 2 de Picas
 */

let baraja = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// referencias a DOM (Eventos Click botones)
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const ref_small = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador_cartas');
const divCartasComputadora = document.querySelector('#computadora_cartas');

/**
 * Esta función crea la baraja de poker
 */
const crearBaraja = () => {

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

    baraja = _.shuffle(baraja); // baraja aleatoriamente la baraja de poker
    console.log(baraja);
    return baraja;

}

/**
 * Está función devuelve una carta al azar
 * @returns carta
 */
const pedirCarta = () => {
    if(baraja.length === 0){
        throw 'No quedan cartas en la baraja';
    }
    
    const carta = baraja.shift();
    console.log(baraja);
    return carta;
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    if(isNaN( valor )){
        return (valor === 'A') ? 11 : 10;
    } else{ return valor * 1; }
}

// Eventos *******
btnNuevo.addEventListener('click', () => {

    console.clear();
    baraja = [];
    baraja = crearBaraja();
    puntosComputadora = 0; 
    puntosJugador = 0;
    ref_small[0].innerText = 0;
    ref_small[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btnDetener.disabled = false;
    btnPedir.disabled = false;
    
});

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    ref_small[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

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

    turnoComputadora(puntosJugador);
});

//Turno computadora
const turnoComputadora = (puntosMinimos) =>{

    do{
        const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    ref_small[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasComputadora.append(imgCarta);

    if(puntosMinimos > 21){
        break;
    }

    } while( (puntosComputadora<puntosMinimos) && puntosMinimos<=21);

    setTimeout( () => {

        if( puntosComputadora === puntosMinimos){
            alert ('Nadie gana :(');
        }
        else if ( puntosMinimos > 21){
            alert('Computadora gana');
        }
        else if ( puntosComputadora>21){
            alert('Jugador gana');
        }
        else{
            alert('Computadora gana');
        }
    }, 100);

}

crearBaraja();