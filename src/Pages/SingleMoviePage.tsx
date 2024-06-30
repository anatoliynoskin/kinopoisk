import { useParams } from "react-router"
import { useGetMovieByIdQuery } from "../store/kinopoiskApi";
import styles from './singleMoviePage.module.css'
import classNames from "classnames";
import noPoster from '../assets/noPoster.svg'
import { CircularProgress } from "@mui/material";

type Params = {
  movieId: number
}

const SingleMoviePage = () => {
  const params : Params = useParams();
  const request = useGetMovieByIdQuery(params.movieId);

  if (request && request.status === 'fulfilled') {
    const data = request.data;
    const movieName = data && (data.name || data.alternativeName || 'Без названия');
    const movieDescription = data && (data.description || data.shortDescription || 'Без описания');

    return (
      data ?
      <div className={classNames(styles.container, styles.flex)}>
        <img className={styles.image} src={data.poster && Boolean(data.poster.url) ? data.poster.url : noPoster} alt={movieName} />
        <div className={styles.info}>
          <h1>Название: {movieName}</h1>
          <p><span className={classNames(styles.bold, styles.mr_10)}>Описание:</span>{movieDescription}</p>
          <div>
            <span className={classNames(styles.mr_10, styles.bold)}>Рейтинги:</span>
            {Boolean(data.rating.imdb) && <span className={styles.mr_10}>IMDB: {Math.round(Number(data.rating.imdb) * 10) / 10}</span>}
            {Boolean(data.rating.kp) && <span className={styles.mr_10}>Кинопоиск: {Math.round(Number(data.rating.kp) * 10) / 10}</span>}
          </div>
          <p>{data.year && <span className={styles.bold}>Год премьеры: </span>}{data.year}</p>
          <div>
            <span className={styles.bold}>Жанры:</span>
            <ul>
              {data.genres.map(el => <li key={`${data.id}_${el.name}`}>{el.name}</li>)}
            </ul>
          </div>
        </div>
      </div>
      : <p className={styles.message}>Я не нашел таких фильмов</p>
    )
  } else if (request.status === 'pending') {
    return <CircularProgress />
  } else {
    return (<div className={styles.container}>
      {request.error && (Array.isArray(request.error.data) ?
      request.error.data.message.map((e : string) => <p className={styles.error}>{e}</p>) :
      <p className={styles.error}>{request.error.data.message}</p>)}
      </div>)
  }

}

export default SingleMoviePage