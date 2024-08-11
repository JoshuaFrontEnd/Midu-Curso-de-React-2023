import { useFilters } from '../hooks/useFilters'
import { products as initialProducts } from '../mocks/products'
import { AddToCartIcon } from './Icons'

import './Products.css'
import { useState } from 'react'

export const Products = () => {

  const [ products ] = useState( initialProducts )
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts( products )

  return (
    <main className='products'>
      <ul>
        {
          // filteredProducts.map( ( product ) => (
          filteredProducts.map(( { id, thumbnail, title, price }) => (
            <li key={ id }>
              <img
                src={ thumbnail }
                alt={ title }
              />
              <div>
                <strong>{ title }</strong> - ${ price }
              </div>
              <div>
                <button>
                  <AddToCartIcon />
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </main>
  )
}
