import { useState } from 'react'
import { useFilters } from '../hooks/useFilters'
import { products as initialProducts } from '../mocks/products'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

import './Products.css'

export const Products = () => {

  const [ products ] = useState( initialProducts )
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts( products )
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some( item => item.id === product.id )
  }

  return (
    <main className='products'>
      <ul>
        {
          // filteredProducts.map(( { id, thumbnail, title, price }) => (
          filteredProducts.map( ( product ) => {

          const isProductInCart = checkProductInCart( product )

          return (
            <li key={ product.id }>
              <img
                src={ product.thumbnail }
                alt={ product.title }
              />
              <div>
                <strong>{ product.title }</strong> - ${ product.price }
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                  onClick={ () => {
                    isProductInCart
                    ? removeFromCart( product )
                    : addToCart( product )
                  }}>
                  {
                    isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )})
        }
      </ul>
    </main>
  )
}
