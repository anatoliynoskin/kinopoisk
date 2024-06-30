export type Poster = {
  url: string ,
  previewUrl: string ,
}

export type Rating = {
  kp?: number,
  imdb?: number,
  tmdb?: number,
  filmCritics?: number,
  russianFilmCritics?: number,
  await?: number
}

export type Genre = {
  name: string,
}

export type Premiere = {
  country: string,
  world: string,
  russia: string,
  digital: string,
  cinema: string,
  bluray: string,
  dvd: string
}

export type Movie = {
  id: number,
  name: string | null,
  alternativeName: string | null,
  poster?: Poster | null,
  description: string | null,
  shortDescription: string | null,
  rating: Rating,
  genres: Array<Genre>,
  year: number,
  premiere: Premiere
}

export type Data = {
  docs: Movie[],
  total: number,
  limit: number,
  page: number,
  pages: number
}