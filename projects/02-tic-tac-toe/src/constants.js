// Creando los turnos
export const TURNS = {
  X: '⨉',
  O: '○'
}

// Una forma de resolver quien gana el juego es mapear de manera literal todo el tablero y detectar las posibles combinaciones ganadoras:
export const WINNER_COMBOS = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ],
]