import { useState } from 'react'
import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'

export function useMovies({ search }) {

  const [responseMovies, setResponseMovies] = useState([])

  const movies = responseMovies.Search

  // Mapeando los datos de la API en caso de que en el futuro cambien los nombres de los datos, al hacerlo de esta manera, evitamos cambiar los nombres en todos los componentes que usen la estructura literal del JSON y solo los cambiamos desde acá
  const mappedMovies = movies?.map( movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }))

  const getMovies = () => {
    if ( search ) {
      // setResponseMovies( withResults )
      fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4a5c581a&s=${search}`)
        .then( res => res.json() )
        .then( json => {
          setResponseMovies( json )
        })

    } else {
      setResponseMovies( withoutResults)
    }
  }

  return { movies: mappedMovies, getMovies }

}