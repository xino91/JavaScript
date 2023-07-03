/**
 * 2C = 2 de Tréboles
 * 2D = 2 de Diamantes
 * 2H = 2 de Corazones
 * 2S = 2 de Picas
 */

let baraja = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];


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
    // console.log(baraja);

    baraja = _.shuffle(baraja);
    console.log(baraja);

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

crearBaraja();
//pedirCarta();
console.log(carta = pedirCarta());
console.log(valorCarta(carta));