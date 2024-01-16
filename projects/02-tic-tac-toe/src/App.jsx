// Creando los turnos
const TURNS = {
  X: 'x',
  O: 'o'
}

// Creando el tablero
// (Creo un array con 9 posiciones y relleno las 9 posiciones con valores null )
const board = Array( 9 ).fill( null );

const Square = ({ children, updateBoard, index }) => {

  return (
    <div className="square">
      { children }
    </div>
  )

}

function App() {

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
              >
                { index }
              </Square>
            )

          })
        }
      </section>
    </main>
  )

}

export default App
