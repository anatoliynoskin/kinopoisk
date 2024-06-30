import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Movie } from "../types";
import 'immer';

type Params = {
  page: number,
  limit: number,
  years?: [number, number],
  genres?: string[],
  rating?: [number, number]
}

type Genre = {
  name: string,
  slug: string
}

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({baseUrl: `https://api.kinopoisk.dev/v1.4/`}),
  endpoints: (builder) => ({
    getMovies: builder.query<Data, Params>({
      query: (params : Params) => {
        let url = `movie?limit=${params.limit}&page=${params.page}&`;

        if (params.years) {
          url += `year=${params.years[0]}-${params.years[1]}&`
        }
        if (params.genres) {
          params.genres.forEach((el) => {
            url += `genres.name=${el}&`;
          })
        }
        if (params.rating) {
          url += `rating.kp=${params.rating[0]}-${params.rating[1]}&`;
        }

        url = url.slice(0, -1);
        return {
          url: url,
          headers: {
            'X-API-KEY': process.env.X_API_KEY,
          }
        }
      }
    }),
    getMovieById: builder.query<Movie, number>({
      query: (id) => ({
        url: `movie/${id}`,
        headers: {
          'X-API-KEY': process.env.X_API_KEY,
        }
      })
    }),
    getGenres: builder.query<Genre[], string>({
      query: () => {
        return {
          url: 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
          headers: {
            'X-API-KEY': process.env.X_API_KEY,
          }
        }
      }
    })
  })
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useGetGenresQuery } = kinopoiskApi;
