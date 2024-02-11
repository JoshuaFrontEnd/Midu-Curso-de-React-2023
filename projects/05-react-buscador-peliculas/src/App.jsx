import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'

function App() {
  // Cuanto tenemos peliculas, cuando tenemos un Search y es un array
  // Por lo tanto las peliculas se encuentran en 'responseMovies.Search
  const movies = responseMovies.Search

  // Cuando sabemos que hay peliculas, cuando movie tiene el "length" mayor a cero
  const hasMovies = movies.length > 0

  // Estas funciones son una mala practica debido a que renderizan UI, en vez de eso deberian ser componentes, por que cada vez que se vuelva a renderizar el componente padre, se ejecutaran estas funciones causando un rendimiento extra completamente innecesario, y al convertir estas funciones en componentes, trabajan de manera independiente donde podran ser llamadas desde cualquier parte, cuando estas funciones sean pasadas a componentes se debe pasar por "props" la informacion que el componente necesita mostrar
  const renderMovies = () => {
    return (
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
  }

  const renderNoResults = () => {
    return (
      <p>No se encontraron resultados para esa búsqueda</p>
    )
  }

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
          ? renderMovies()
          /* Si no tiene peliculas, mostrar un mensaje */
          : renderNoResults()
        }

      </main>

    </div>
  )
}

export default App
