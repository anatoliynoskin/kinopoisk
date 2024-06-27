import { Genres, Poster, Rating } from '../store/slices/movieSlice'

type Props = {
  key: number,
  name: string,
  poster: Poster,
  description: string,
  rating: Rating,
  genres: Genres,
}

export const MovieCard = ({key, name, poster, description, rating, genres}: Props) => {
  return (
    <div key={key}>{name}</div>
  )
}