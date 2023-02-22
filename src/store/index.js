import { configureStore } from "@reduxjs/toolkit";
import addMoviesReducer from "./MovieSlice";

export const store = configureStore({
  reducer: {
    movie: addMoviesReducer,
  },
});
