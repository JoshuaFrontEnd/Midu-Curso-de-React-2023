function ListOfMovies ({movies}) {
  return (
    <ul>
      {
        // Al parsear el JSON de esta manera estamos "atando" la estructura de la data a la UI, para evitar esto podemos "mapear" los datos del JSON en variables, solucion en el siguiente commit
        movies.map( movie => (
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