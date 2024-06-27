export type Poster = {
  url: string,
  previewUrl: string,
}

export type Rating = {
  "kp": number,
  "imdb": number,
  "filmCritics": number,
  "russianFilmCritics": number,
}

export type Genre = {
  name: "боевик" | "триллер" | "криминал",
}

export type Genres = {
  genres: Genre[],
}

export type Movie = {
  id: number,
  name: string,
  poster: Poster,
  description: string,
  rating: Rating,
  genres: Genres
}

export type Data = {
  docs: Movie[],
  "total": number,
  "limit": number,
  "page": number,
  "pages": number
}