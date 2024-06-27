import { useEffect } from 'react'
import { fetchMovies } from '../store/slices/movieSlice'
import { useAppDispatch } from '../hooks/redux-hooks';
import { useSelector } from 'react-redux';
import MovieList from '../components/MovieList';

const FilmsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movies = useSelector(state => state.movie.movies.docs);
  const error = useSelector(state => state.movie.error);
  const status = useSelector(state => state.movie.status);

  if (status === 'success') {
    return <MovieList movies={movies} />
  } else {
    return <>{status}</>
  }
}


export default FilmsPage