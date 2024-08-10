import { useState } from 'react'
import './Filters.css'

export const Filters = ({ setFilters }) => {

  // Seteando el estado del rango
  const [ minPrice, setMinPrice ] = useState(0)

  // Aquí hay un error a pesar de que este funcionando, porque estamos pasando la funcion de actualizar estado a un componente hijo
  const handleChangeMinPrice = ( event ) => {

    setMinPrice( event.target.value )

    setFilters( prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))

  }

  const handleChangeCategory = ( event ) => {
    setFilters( prevState => ({
     ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>

      <div>
        <label htmlFor='price'>Precio</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1000'
          onChange={ handleChangeMinPrice }
        />
        <span>${ minPrice }</span>
      </div>

      <div>
        <label htmlFor='category'>Categoría</label>
        <select id='category' onChange={ handleChangeCategory }>
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>

    </section>
  )
}
