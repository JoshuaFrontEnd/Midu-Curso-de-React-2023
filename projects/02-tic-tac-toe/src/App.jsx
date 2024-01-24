import { useState } from 'react';
import confetti from 'canvas-confetti'

import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { resetGameToStorage, saveGameToStorage } from './logic/storage';

function App() {

  // console.log('render');

  // En React no se pueden usar los Hooks dentro de un ciclo o condicion ( If, While, For, etc...) porque React guarda la posicion de cada hook en memoria para poder ejecutarlos siempre en el mismo orden, asi se asegura de que el estado se ha actualizado de manera correcta, si se aplica una condicion o ciclo, estos podrian ejecutarse en otro orden, causando inconsistencias en el estado y problemas en el renderizado. La manera correcta de utilizar un Hook es en el cuerpo del componente
  const [ board, setBoard ] = useState(() => {

    // console.log('Inicializando el estado');

    // Obtengo el valor guardado en el localStorage, esto se setea aca, porque si seteara antes del hook, React lo rendezaria cada vez que cargue el componente de manera innecesaria, haciendo lenta la app
    const boardFromStorage = window.localStorage.getItem('board');

    // Si hay un valor en el localStorage seteo ese en el estado, si no, seteo el estado con el arreglo de valores "null"
    return boardFromStorage ? JSON.parse( boardFromStorage ) : Array( 9 ).fill( null );

  });

  const [ turn, setTurn ] = useState(() => {

    const turnFromStorage = window.localStorage.getItem( 'turn');

    // El doble ?? ( operador de fusión nula o en ingles nullish coalescing operator ) detecta si el primer valor es null o undefined, si no lo es retorna ese valor, si lo es retorna el segundo
    return turnFromStorage ?? TURNS.X;
  });

  //Null no hay ganador, false es que hay un empate
  const [ winner, setWinner ] = useState( null );

  // En react para poder resetear los datos de una app basta con dejar el estado con sus valores iniciales, sin necesidad de recargar la pagina:
  const resetGame = () => {
    setBoard( Array( 9 ).fill( null ) );
    setTurn( TURNS.X );
    setWinner( null );

    resetGameToStorage();

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

    // Guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    // Revisando si hay ganador
    const newWinner = checkWinnerFrom( newBoard );

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

      <WinnerModal resetGame={ resetGame } winner={ winner } />

    </main>
  )

}

export default App;