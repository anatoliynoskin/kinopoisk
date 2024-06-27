import { Poster, Rating, Genres } from "../types"

type Props = {
  name: string,
  poster: Poster,
  description: string,
  rating: Rating,
  genres: Genres,
}

export const MovieCard = ({name, poster, description, rating, genres}: Props) => {
  return (
    <div>{name}</div>
  )
}