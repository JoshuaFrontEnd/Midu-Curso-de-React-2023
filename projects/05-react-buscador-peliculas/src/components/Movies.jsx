function ListOfMovies ({movies}) {
  return (
    <ul>
      {
        // Parseando los datos de la API pero ocupando el mapeo en vez de la estructura literal del JSON, de esta manera si cambia esa estructura el cambio se hara solo en el mapeo y no en cada componente
        movies.map( movie => (
          <li key={ movie.id }>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}


function NoMoviesResults () {
  return (
    <p>No se encontraron resultados para esa búsqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={ movies } />
      : <NoMoviesResults />
  )
}