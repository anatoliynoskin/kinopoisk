import { Link } from "react-router-dom"
import { Movie } from "../../types"
import noPoster from '../../assets/noPoster.svg';
import styles from './movieCard.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import classNames from "classnames";

type Props = Pick<Movie, 'id' | 'name' | 'alternativeName' | 'poster' | 'rating' | 'year'>

export const MovieCard = ({
  id,
  name,
  alternativeName,
  poster,
  rating,
  year
}: Props) => {
  const movieName = name || alternativeName || 'Без названия';

  return (
    <Link to={`/movie/${id}`} className={styles.card}>
      <img className={styles.image} src={poster && Boolean(poster.previewUrl) ? poster.previewUrl : noPoster} alt={movieName} />
      <div className={styles.info}>
        <h3>Название: {movieName}</h3>
        <span className={styles.year}>Год: {year}</span>
        {
          Boolean(rating.imdb) || Boolean(rating.kp) ?
          <div>
            <span className={classNames(styles.mr_10, styles.bold)}>Рейтинги:</span>
            {Boolean(rating.imdb) && <span className={styles.mr_10}>IMDB: {Math.round(Number(rating.imdb) * 10) / 10}</span>}
            {Boolean(rating.kp) && <span className={styles.mr_10}>Кинопоиск: {Math.round(Number(rating.kp) * 10) / 10}</span>}
          </div>
          : ''
        }
      </div>
    </Link>
  )
}