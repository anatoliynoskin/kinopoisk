
import { Movie } from '../store/slices/movieSlice'
import {MovieCard} from './MovieCard'

type Props = {
  movies: Movie[]
}

const MovieList = ({movies}: Props) => {
  return (
    <>
      {movies.map(movie => <MovieCard key={movie.id} name={movie.name} poster={movie.poster} description={movie.description} rating={movie.rating} genres={movie.genres}/>)}
    </>
  )
}

export default MovieList