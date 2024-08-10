import { useState } from 'react'
import { products as initialProducts } from './mocks/products'
import { Products } from './components/Products'
import { Header } from './components/Header'

function App() {
  const [ products ] = useState( initialProducts )
  const [ filters, setfilters ] = useState({
    category: 'all',
    minPrice: 0
  })

  // console.log( initialProducts )


  const filterProducts = ( products ) => {
    return products.filter( product => {

      // console.log( product.category )

      return (
        // El precio del producto debe ser mayor o igual al precio mínimo especificado en el objeto filters.
        product.price >= filters.minPrice &&
        (
          // Si la categoría en el objeto filters es igual a 'all', entonces se incluyen todos los productos sin importar su categoría.
          filters.category === 'all' ||
          //  Si la categoría del producto es igual a la categoría especificada en el objeto filters, entonces se incluye el producto
          product.category === filters.category
        )
      )

    })
  }

  const filteredProducts = filterProducts( products )

  return (
    <>
      <Header changeFilters={ setfilters } />
      <Products products={ filteredProducts } />
    </>
  )
}

export default App
