import MovieList from '../components/MovieList';
import { useGetMoviesQuery } from '../store/kinopoiskApi';

const FilmsPage = () => {

  const {data, isLoading} = useGetMoviesQuery();

  if (isLoading) {
    return <h1>loading...</h1>
  } else {
    return (data ? <MovieList movies={data.docs}/> : 'empty')
  }
}


export default FilmsPage