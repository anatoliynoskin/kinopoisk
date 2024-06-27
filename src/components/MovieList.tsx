

import { Movie } from '../types'
import {MovieCard} from './MovieCard'

type Props = {
  movies: Movie[] | undefined
}

const MovieList = ({movies}: Props) => {
  return (
    <>
      {movies ? movies.map(movie => <MovieCard key={movie.id} name={movie.name} poster={movie.poster} description={movie.description} rating={movie.rating} genres={movie.genres}/>): 'empty'}
    </>
  )
}

export default MovieList