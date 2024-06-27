import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

type InitialState = {
  movies: Movie[],
  status: null | string,
  error: null | string,
}

export const fetchMovieById = createAsyncThunk(
  'movie/fetchById',
  async (movieId: number) => {
    const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${movieId}`);
    const movie = await response.json();

    return movie;
  },
);

export const fetchMovies = createAsyncThunk(
  'movie/fetchById',
  async (_, {rejectWithValue}) => {
      try{
        const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=50`, {
          headers: {
            'X-API-KEY': process.env.X_API_KEY,
          }
        })
        if (!response.ok) {
          throw new Error(await response.json());
        }
        return await response.json();
      }
      catch(error){
        console.log(error);
        return rejectWithValue(error.message)
      }
    },

);

const initialState : InitialState = {
  movies: [],
  status: null,
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = 'success';
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    })
  },
});

export default movieSlice.reducer;