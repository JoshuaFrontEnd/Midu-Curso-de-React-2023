import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export const useFilters = () => {

  const { filters, setFilters } = useContext( FiltersContext )

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

  return { filters, setFilters, filterProducts }

}