import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data } from "../types";

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({baseUrl: `https://api.kinopoisk.dev/v1.4/`}),
  endpoints: (builder) => ({
    getMovies: builder.query<Data, string>({
      query: () => ({
        url: `movie?page=1&limit=50`,
        headers: {
          'X-API-KEY': process.env.X_API_KEY,
        }
      })
    })
  })
});

export const { useGetMoviesQuery } = kinopoiskApi;
