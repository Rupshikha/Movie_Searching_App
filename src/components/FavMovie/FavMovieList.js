import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefavMovie } from "../../store/MovieSlice";
import { getMoviesFromLocalStorage } from "../MovieListing/MovieListing";
import styles from "./FavMovie.module.css";
import FavMovieCard from "./FavMovieCard";

export default function FavMovie() {
  let movies = useSelector((state) => {
    const movies = getMoviesFromLocalStorage();
    return movies ?? state.movie.movieList;
  });
  let dispatch = useDispatch();

  function removieFavMovie(id) {
    let movies = getMoviesFromLocalStorage();
    movies = movies?.map((item) =>
      item.imdbID === id ? { ...item, isFav: false } : item
    );
    localStorage.setItem("movielist", JSON.stringify(movies));
    dispatch(removefavMovie(id));
  }

  return (
    <div className={styles["display_movie"]}>
      {movies.map((item) => (
        <FavMovieCard
          movie={item}
          key={item.imdbID}
          removieFavMovie={() => removieFavMovie(item.imdbID)}
        />
      ))}
    </div>
  );
}
