import { React, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addMovies } from "../../store/MovieSlice";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./MovieListing.module.css";

export const getMoviesFromLocalStorage = () => {
  try {
    const movies = localStorage.getItem("movielist");
    if (movies) return JSON.parse(movies);
    return null;
  } catch (error) {
    return null;
  }
};

export default function MovieListing() {
  const baseURL = "https://www.omdbapi.com";
  const APIKEY = "45ab3312";
  const movieList = useSelector((state) => {
    const movies = getMoviesFromLocalStorage();
    return movies?.length > 0 ? movies : state.movie.movieList;
  });

  console.log("movieList", movieList);
  const Title = useSelector((state) => state.movie.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios
        .get(`${baseURL}?apikey=${APIKEY}&s=${Title}&type=movie`)
        .catch((error) => {
          console.log("error", error);
        });
      console.log("response search value", response);
      const movies = response.data?.Search?.map((item) => ({
        ...item,
        isFav: false,
      }));
      localStorage.setItem("movielist", JSON.stringify(movies || []));
      dispatch(addMovies(movies));
    };

    console.log("Me getting called");
    fetchMovie();
  }, [Title]);

  let renderMovies = movieList?.map((movie, index) => (
    <MovieCard movie={movie} key={index} />
  ));
  console.log("moviecard", renderMovies);
  return <div className={styles["display_movie"]}>{renderMovies}</div>;
}
