import { useParams } from 'react-router';
import MovieList from '../components/MovieList/MovieList';
import { useGetMoviesQuery } from '../store/kinopoiskApi';
import MoviesFilter from '../components/MovieFilter/MoviesFilter';
import { useState } from 'react';
import { CircularProgress, Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import classes from './moviesPage.module.css'
import classNames from 'classnames';

const MoviesPage = () => {
  const params = useParams();
  const page = params.pageNumber ? +params.pageNumber : 1;
  const limit = 50;
  const [years, setYears] = useState<[number, number]>([1990, 2024]);
  const [genres, setGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<[number, number]>([1, 10]);

  const request = useGetMoviesQuery({page, limit, years, genres, rating});
  const data = request.data;

  if (request && request.status === 'fulfilled') {
    return (data && Boolean(data.docs.length) ? <>
      <div className={classNames(classes.container, classes.flex)}>
        <MoviesFilter
          years={years}
          setYears={setYears}
          genres={genres}
          setGenres={setGenres}
          rating={rating}
          setRating={setRating}
        />
        <MovieList movies={data.docs}/>
      </div>
      <Pagination
      className={classes.pagination}
        count={data.pages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/movies/${item.page}`}
            {...item}
          />
        )}
      />
    </>
    : <div className={classNames(classes.container, classes.flex)}>
    <MoviesFilter
      years={years}
      setYears={setYears}
      genres={genres}
      setGenres={setGenres}
      rating={rating}
      setRating={setRating}
    />
    <p className={classes.message}>Я не нашел таких фильмов</p>
  </div>
  )
  } else if (request.status === 'pending') {
    return <div className={classNames(classes.container, classes.flex)}>
      <MoviesFilter
        years={years}
        setYears={setYears}
        genres={genres}
        setGenres={setGenres}
        rating={rating}
        setRating={setRating}
      />
      <div className={classes.preloader}>
        <CircularProgress />
      </div>
    </div>
  } else {
    return (<div className={classes.container}>
      {request.error && (Array.isArray(request.error.data) ?
      request.error.data.message.map((e : string) => <p className={classNames(classes.error, classes.message)}>{e}</p>) :
      <p className={classes.error}>{request.error.data.message}</p>)}
      </div>)
  }
}


export default MoviesPage