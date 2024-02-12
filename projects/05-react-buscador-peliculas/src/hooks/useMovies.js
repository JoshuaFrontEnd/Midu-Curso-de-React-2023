import responseMovies from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'

export function useMovies() {

  const movies = responseMovies.Search

  // Mapeando los datos de la API en caso de que en el futuro cambien los nombres de los datos, al hacerlo de esta manera, evitamos cambiar los nombres en todos los componentes que usen la estructura literal del JSON y solo los cambiamos desde acá
  const mappedMovies = movies?.map( movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }))

  return { movies: mappedMovies }

}