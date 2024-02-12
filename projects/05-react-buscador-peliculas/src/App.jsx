import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'
import { Movies } from './components/Movies'

function App() {

  const movies = responseMovies.Search

  // Mapeando los datos de la API en caso de que en el futuro cambien los nombres de los datos, al hacerlo de esta manera, evitamos cambiar los nombres en todos los componentes que usen la estructura literal del JSON y solo los cambiamos desde acá
  const mappedMovies = movies?.map( movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>

    </div>
  )
}

export default App
