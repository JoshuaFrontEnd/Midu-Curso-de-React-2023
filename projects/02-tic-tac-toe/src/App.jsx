import { useState } from 'react';
import confetti from 'canvas-confetti'

// Creando los turnos
const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${ isSelected ? 'is-selected' : '' }`;

  const handleClick = () => {
    updateBoard( index );
  }

  return (
    <div onClick={ handleClick } className={ className }>
      { children }
    </div>
  )

}

// Una forma de resolver quien gana el juego es mapear de manera literal todo el tablero y detectar las posibles combinaciones ganadoras:
const WINNER_COMBOS = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ],
]

function App() {

  const [ board, setBoard ] = useState( Array( 9 ).fill( null ) );

  const [ turn, setTurn ] = useState( TURNS.X );

  //Null no hay ganador, false es que hay un empate
  const [ winner, setWinner ] = useState( null );

  const checkWinner = ( boardToCkeck ) => {

    for ( const combo of WINNER_COMBOS ) {

      const [ a, b, c ] = combo;

      // Reviso que en las tres pocisiones se encuentre el mismo simbolo
      if (
        // Detecto que simbolo existe en la posicion "a"
        boardToCkeck[ a ] &&
        // Luego comparo ese valor con lo que hay en la posicion "b"
        boardToCkeck[ a ] === boardToCkeck[ b ] &&
        // Si son iguales comparo el valor de la posicion "a" con lo que hay en "c"
        boardToCkeck[ a ] === boardToCkeck[ c ] ) {
          // si los tres valores de las diferentes posiciones son iguales, ya se que simbolo es el ganador y lo devuelvo
          return boardToCkeck[ a ];
      }

    }
    // Si no existe ganador retorno "null"
    return null;
  }

  // En react para poder resetear los datos de una app basta con dejar el estado con sus valores iniciales, sin necesidad de recargar la pagina:
  const resetGame = () => {
    setBoard( Array( 9 ).fill( null ) );
    setTurn( TURNS.X );
    setWinner( null );
  }

  // Revisando si hay un empate al finalizar el juego, esta funcion se llama si no se encuentra un ganador, por lo que mas que detectar literalmente un empate, detecta, despues de no encontrar un ganador, si el juego ha finalizado, entonces se da por hecho, que si no existe ganador y el juego ha terminado, esto debiese ser un empate
  const checkEndGame = ( newBoard ) => {

    // Si todos los valores de todas las posiciones del tablero son distintas de "null" el juego ha terminado
    return newBoard.every( ( square ) => square !== null );
  }

  const updateBoard = ( index ) => {

    // Si el indice ya tiene algo no se actualiza esa posicion
    // Acá se evalua, si el valor es "null" se considera "falsy" por lo tanto el espacio esta vacio y debe rellenarse, pero si el valor es un numero, se considera "truthy" asi que se termina la ejecucion de la funcion para no rellenarse, ya que existe un valor numerico en esa posicion
    // Si existe un ganador el tablero se bloquea
    if ( board[ index ] || winner ) return;

    // Actualizar el tablero
    const newBoard = [...board];

    newBoard[ index ] = turn; // 'x' u 'o'
    setBoard( newBoard );

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn( newTurn );

    // Revisando si hay ganador
    const newWinner = checkWinner( newBoard );

    // Observacion sobre esta linea: React al actualizar el estado es asincrono, es decir, "setWinner" seteara el ganador en el estado, pero no detendra la ejecucion del codigo, por lo que cuando el alert intente ir a buscar el valor de "newWinner" leera el estado desfasado y no el estado actual. Cuando el componenente se vuelva a renderizar estara disponible el valor actualizado de "newWinner" para el alert
    if ( newWinner ) {
      confetti();
      setWinner( newWinner );
      // alert(`El ganador es ${ newWinner }`);
      // console.log( winner );

      // Para poder obtener el valor de manera inmediata la funcion de seteo del Hook "useState" permite enviar un callback para obtener ese valor y el valor previo del estado, en este caso seria asi:
      // setWinner( ( prevWinner ) => {
      //   console.log(`Ganador: ${ newWinner }, el anterior era ${ prevWinner }`);
      //   return newWinner;
      // })
    } else if ( checkEndGame( newBoard ) ) {
      // Detectando si hay un empate
      setWinner( false );
    }

  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={ resetGame }>Reset del juego</button>

      {/* Renderizo el array */}
      <section className="game">
        {
          /* La funcion "map" de javascript toma en el callback tres parametros en un orden especifico: valor, indice, y el array original, por lo que aun cuando no se use el valor pero si quiero usar el indice, debo pasarle si o si el valor para poder despues declarar el indice. Seria distinto si solo quiero usar el valor, ahi no es necesario declarar el indice. Si quisiera usar el array original, debo declarar el valor y el indice, aun cuando no los use. Acá no estoy usando el array original, por lo que puedo omitirlo  */
          board.map( ( square, index ) => {
            return (
              <Square
                key={ index }
                index={ index }
                updateBoard={ updateBoard }
              >
                { square }
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={ turn === TURNS.X }>
          { TURNS.X }
        </Square>
        <Square isSelected={ turn === TURNS.O }>
          { TURNS.O }
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó: '
                }
              </h2>

              <header className="win">
                { winner &&<Square>{ winner }</Square> }
              </header>

              <footer>
                <button onClick={ resetGame }>Empezar de nuevo</button>
              </footer>

            </div>
          </section>
        )
      }

    </main>
  )

}

export default App