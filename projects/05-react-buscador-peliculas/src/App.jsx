import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function App() {

  const { movies } = useMovies();

  const handleSubmit = ( event ) => {
    event.preventDefault()

    // Un input especifico
    // const fields = new FormData( event.target )
    // const query = fields.get('query')
    // console.log( query )

    // Multiples inputs
    const fields = Object.fromEntries(
      new FormData( event.target )
    )
    console.log( fields )

  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={ handleSubmit }>
          <input name='query' placeholder='Avengers, Star Wars, The Matrix...' />
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