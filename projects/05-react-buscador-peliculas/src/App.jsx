import './App.css'
import { useMovies } from './hooks/useMovies'
import { useState } from 'react';
import { Movies } from './components/Movies'

function App() {

  const { movies } = useMovies();
  const [query, setQuery] = useState('')

  // Cada vez que cambia el input, se esta renderizando el componente
  console.log('render');

  const handleSubmit = ( event ) => {
    event.preventDefault()
    console.log({ query })

  }

  const handleChange = ( event ) => {
    setQuery( event.target.value )
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={ handleSubmit }>
          <input onChange={ handleChange } value={ query } name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={ movies } />
      </main>

    </div>
  )
}

export default App


/* --------------------------------------------------------------
  - Hook useRef:

  Te permite crear una referencia mutable que persiste durante todo el ciclo de vida del componente, y lo que es mejor que es muy util para guardar cualquier valor que puedas mutar, como un identificador, un elemento del DOM, un contador, etc, y que cada vez que cambia no vuelve a renderizar el componente
-------------------------------------------------------------- */