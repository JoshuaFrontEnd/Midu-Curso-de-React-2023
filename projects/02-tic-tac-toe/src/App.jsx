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
          board.map( ( _, index ) => {

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
