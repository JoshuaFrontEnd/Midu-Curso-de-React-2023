import './App.css'
import { useState, useEffect, useRef } from 'react';
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInputRender = useRef(true)

  useEffect(() => {

    /* ----------------------------------------------------------------
      Usando useRef para detectar el primer valor del input search

      - Siempre la primera vez el valor de "search" sera una cadena vacia (''), por lo tanto el valor de "isFirstInputRender" sera de "true" y no se ejecutaran las validaciones siguientes
      - Cuando se ingrese un dato en el input, el valor de "search" ya no sera una cadena vacia, por lo tanto el valor de "isFirstInputRender" sera de false y se ejecuraran las validaciones siguientes
    ---------------------------------------------------------------- */
    if ( isFirstInputRender.current ) {
      // Si el valor de "search" es una cadena vacia ('') el valor de "isFirstInputRender" sera de "true" de lo contrario sera "false"
      isFirstInputRender.current = search === ''
      return
    }

    if ( search === '' ) {
      setError('No se puede buscar una película vacía')
      return
    }

    if ( search.match(/^\d+$/) ) {
      setError('No se puede buscar una película con un número')
      return
    }

    if ( search.length < 3 ) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError( null )

  }, [search])

  return { search, updateSearch, error}

}



function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSubmit = ( event ) => {
    event.preventDefault()
    getMovies()
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = ( event ) => {
    updateSearch( event.target.value )
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={ handleSubmit }>
          <input onChange={ handleChange } value={ search } name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type="checkbox" onChange={ handleSort } checked={ sort } />
          <button type='submit'>Buscar</button>
        </form>
        { error && <p style={{ color: 'red' }}>{ error }</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={ movies } />
        }
      </main>

    </div>
  )
}

export default App


/* --------------------------------------------------------------
  - Hook useRef:

  Te permite crear una referencia mutable que persiste durante todo el ciclo de vida del componente, y lo que es mejor que es muy util para guardar cualquier valor que puedas mutar, como un identificador, un elemento del DOM, un contador, etc, y que cada vez que cambia no vuelve a renderizar el componente
-------------------------------------------------------------- */