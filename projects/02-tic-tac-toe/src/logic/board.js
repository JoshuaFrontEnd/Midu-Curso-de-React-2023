import { WINNER_COMBOS } from '../constants'

export const checkWinnerFrom = (boardToCkeck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo

    // Reviso que en las tres pocisiones se encuentre el mismo simbolo
    if (
      // Detecto que simbolo existe en la posicion "a"
      boardToCkeck[a] &&
      // Luego comparo ese valor con lo que hay en la posicion "b"
      boardToCkeck[a] === boardToCkeck[b] &&
      // Si son iguales comparo el valor de la posicion "a" con lo que hay en "c"
      boardToCkeck[a] === boardToCkeck[c]) {
      // si los tres valores de las diferentes posiciones son iguales, ya se que simbolo es el ganador y lo devuelvo
      return boardToCkeck[a]
    }
  }
  // Si no existe ganador retorno "null"
  return null
}

// Revisando si hay un empate al finalizar el juego, esta funcion se llama si no se encuentra un ganador, por lo que mas que detectar literalmente un empate, detecta, despues de no encontrar un ganador, si el juego ha finalizado, entonces se da por hecho, que si no existe ganador y el juego ha terminado, esto debiese ser un empate
export const checkEndGame = (newBoard) => {
  // Si todos los valores de todas las posiciones del tablero son distintas de "null" el juego ha terminado
  return newBoard.every((square) => square !== null)
}
