import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'

function App() {
  // Cuanto tenemos peliculas, cuando tenemos un Search y es un array
  // Por lo tanto las peliculas se encuentran en 'responseMovies.Search
  const movies = responseMovies.Search

  // Cuando sabemos que hay peliculas, cuando movie tiene el "length" mayor a cero
  const hasMovies = movies.length > 0

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
        {
          /* Renderizado condicional */
          /* Si tiene peliculas, Lista las películas y muestra el título, año y poster */
          hasMovies
          ? (
              <ul>
                {
                  movies.map((movie) => (
                    <li key={ movie.imdbID }>
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                      <img src={movie.Poster} alt={movie.Title} />
                    </li>
                  ))
                }
              </ul>
            )
          /* Si no tiene peliculas, mostrar un mensaje */
          : (
              <p>No se encontraron resultados para esa búsqueda</p>
            )
        }

      </main>

    </div>
  )
}

export default App
