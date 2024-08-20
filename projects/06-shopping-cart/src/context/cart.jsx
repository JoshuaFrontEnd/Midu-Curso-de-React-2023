import { createContext, useReducer } from 'react';

export const CartContext = createContext()

// Estado Inicial
const initialState = []

// Reducer
const reducer = ( state, action ) => {

  const { type: actionType, payload: actionPayload } = action

  switch ( actionType ) {

    case 'ADD_TO_CART': {
      const { id } = actionPayload

      // Primero hay que chequear si el producto ya está en el carrito
      // Una forma de hacerlo, pero no tan recomendada, es:
      // - Comparar los id's de los items del carrito con el id del producto que se quiere agregar
      // - Si encuentra una coincidencia con "findIndex" significa que el producto que quiero agregar ya existe como item en el arreglo de "cart", por lo tanto retorna el indice de ese item, si no retorna -1
      const productInCartIndex = state.findIndex( item => item.id === id )

      // Si el indice es mayor o igual a 0 significa que el producto que quiero agregar ya existe en el carrito, por lo tanto creo una copia del carrito para poder ir sumando el boton de "Cantidad"
      if ( productInCartIndex >= 0 ) {
        const newState = structuredClone( state )
        newState[ productInCartIndex ].quantity += 1
        return newState
      }

      // Pero si el indice es -1 significa que el producto que quiero agregar no existe en el carrito, por lo tanto lo agrego al carrito actualizando el estado
      return [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1
        }
      ]

    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      // En este caso simplemente filtramos el arreglo de "cart" para quitar el producto que coincide con el id del producto que se quiere eliminar
      return state.filter( item => item.id!== id )
    }

    case 'CLEAR_CART': {
      return initialState
    }

  }

  return state

}

// Acciones
export const CartProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer( reducer, initialState )

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })

  return (
    <CartContext.Provider value={{
        cart: state,
        clearCart,
        addToCart,
        removeFromCart
      }}>
      { children }
    </CartContext.Provider>
  )



}