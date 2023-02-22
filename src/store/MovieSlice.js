import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  searchQuery: "",
  movieDetailList: [],
  favMovieList: [],
  // isfav:'false',
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movieList = payload; //{...state,payload}
      //console.log("moviestore", state.movieList);
    },
    addTitle: (state, { payload }) => {
      state.searchQuery = payload;
    },
    addMovieDetail: (state, { payload }) => {
      state.movieDetailList = payload;
    },
    addFavMovie: (state, { payload }) => {
      state.movieList = state.movieList.map((item) =>
        item.imdbID === payload ? { ...item, isFav: true } : item
      );
    },
    removefavMovie: (state, { payload }) => {
      state.movieList = state.movieList.map((item) =>
        item.imdbID === payload ? { ...item, isFav: false } : item
      );
    },
  },
});

export const {
  addMovies,
  addTitle,
  addMovieDetail,
  addFavMovie,
  removefavMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
