import { useState } from 'react';

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

function App() {

  const [ board, setBoard ] = useState( Array( 9 ).fill( null ) );

  const [ turn, setTurn ] = useState( TURNS.X );

  const updateBoard = ( index ) => {

    // Si el indice ya tiene algo no se actualiza esa posicion
    // Acá se evalua, si el valor es "null" se considera "falsy" por lo tanto el espacio esta vacio y debe rellenarse, pero si el valor es un numero, se considera "truthy" asi que se termina la ejecucion de la funcion para no rellenarse, ya que existe un valor numerico en esa posicion
    if ( board[ index ] ) return;

    // Actualizar el tablero
    const newBoard = [...board];

    newBoard[ index ] = turn; // 'x' u 'o'
    setBoard( newBoard );

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn( newTurn );

  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      {/* Renderizo el array */}
      <section className="game">
        {
          /* La funcion "map" de javascript toma en el callback tres parametros en un orden especifico: valor, indice, y el array original, por lo que aun cuando no se use el valor pero si quiero usar el indice, debo pasarle si o si el valor para poder despues declarar el indice. Seria distinto si solo quiero usar el valor, ahi no es necesario declarar el indice. Si quisiera usar el array original, debo declarar el valor y el indice, aun cuando no los use. Acá no estoy usando el array original, por lo que puedo omitirlo  */
          board.map( ( value, index ) => {
            return (
              <Square
                key={ index }
                index={ index }
                updateBoard={ updateBoard }
              >
                { board[ index ] }
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

    </main>
  )

}

export default App