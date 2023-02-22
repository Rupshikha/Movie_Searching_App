import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavMovie } from "../../store/MovieSlice";
import { getMoviesFromLocalStorage } from "../MovieListing/MovieListing";
import styles from "./MovieCard.module.css";

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
`;

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  console.log("moviecard", movie);
  function addFavMovies(movie) {
    let movies = getMoviesFromLocalStorage();

    movies = movies?.map((item) =>
      item.imdbID === movie.imdbID ? { ...item, isFav: true } : item
    );
    localStorage.setItem("movielist", JSON.stringify(movies));
    dispatch(addFavMovie(movie.imdbID));
  }

  return (
    <div className={styles.imgContainer}>
      <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
        <Card
          className={styles.card}
          sx={{
            position: "relative",
            backgroundColor: "#363636",
            maxWidth: "245",
            margin: "1em",
            transition: "all 0.3s",
            ":hover": {
              transform: "scale(1.1)",
              transition: "all 0.3s",
            },
          }}
        >
          <CardContent>
            <img
              src={movie.Poster}
              alt=""
              style={{ width: "210px", height: "240px" }}
            />
            <div>
              {" "}
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#cec2c6" }}
              >
                {movie.Title.length > 20
                  ? `${movie.Title.slice(0, 20)} ...`
                  : movie.Title}
              </Typography>
            </div>
            <MovieInfo>
              <Typography
                sx={{ fontSize: "13px", fontWeight: "700", color: "#cec2c6" }}
              >
                Year: {movie.Year}
              </Typography>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  addFavMovies(movie);
                }}
              >
                {!movie.isFav ? (
                  <FavoriteBorderIcon fontSize="24" sx={{ color: "white" }} />
                ) : (
                  <FavoriteIcon fontSize="24" sx={{ color: "red" }} />
                )}
              </div>
            </MovieInfo>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Link>
    </div>
  );
}
