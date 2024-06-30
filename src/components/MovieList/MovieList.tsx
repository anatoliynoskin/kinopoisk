import { Movie } from '../../types'
import {MovieCard} from '../MovieCard/MovieCard'
import classes from './movieList.module.css'

type Props = {
  movies: Movie[] | undefined
}

const MovieList = ({movies}: Props) => {
  return (
    <div className={classes.container}>
      { movies
      ? movies.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          name={movie.name}
          alternativeName={movie.alternativeName}
          poster={movie.poster}
          rating={movie.rating}
          year={movie.year}
        />
      ))
      : 'empty'}
    </div>
  )
}

export default MovieList