import { React, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMovieDetail } from "../../store/MovieSlice";
import styles from "./MovieDetail.module.css";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

export default function MovieDetail() {
  const { imdbID } = useParams();
  const baseURL = "https://www.omdbapi.com";
  const APIKEY = "45ab3312";
  const movieDetail = useSelector((state) => state.movie.movieDetailList);
  const dispatch = useDispatch();

  useEffect(() => {
    const movieDetail = async (id) => {
      const response = await axios
        .get(`${baseURL}?i=${imdbID}&apikey=${APIKEY}&plot=full`)
        .catch((error) => {
          console.log(error);
        });
      console.log("response", response.data);
      dispatch(addMovieDetail(response.data));
    };
    movieDetail();
  }, [dispatch, imdbID]);
  console.log("url", movieDetail?.Poster);
  return (
    <div
      style={
        {
          //backgroundImage:`url(${movieDetail?.Poster})`,  backgroundAttachment: "fixed",
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
        }
      }
    >
      <div
        className={styles["movie_section"]}
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255,255,0.2 )",
        }}
      >
        {movieDetail.length === 0 ? (
          <div>...loading</div>
        ) : (
          <>
            <div className={styles["section_left"]}>
              <div className={styles["movie_title"]}>{movieDetail.Title}</div>
              <div className={styles["movie_rating"]}>
                <span>
                  IMDB Rating{" "}
                  <StarIcon sx={{ color: "#ff9e00", paddingLeft: "1px" }} />:{" "}
                  {movieDetail.imdbRating}
                </span>
                <span>
                  IMDB Votes{" "}
                  <ThumbUpIcon sx={{ color: "#fafafa", paddingLeft: "1px" }} />:{" "}
                  {movieDetail.imdbVotes}
                </span>
                <span>
                  Runtime{" "}
                  <SubtitlesIcon
                    sx={{ color: "rgb(191, 213, 214)", paddingLeft: "1px" }}
                  />{" "}
                  : {movieDetail.Runtime}
                </span>
                <span>
                  {" "}
                  Year{" "}
                  <AssignmentLateIcon
                    sx={{ color: "peachpuff", paddingLeft: "1px" }}
                  />
                  : {movieDetail.Year}
                </span>
              </div>
              <div className={styles["movie_plot"]}>{movieDetail.Plot}</div>

              <div className={styles["movie-info"]}>
                <div>
                  <span>Director</span>
                  <span>{movieDetail?.Director}</span>
                </div>
                <div>
                  <span>Stars</span>
                  <span>{movieDetail?.Actors}</span>
                </div>
                <div>
                  <span>Generes</span>
                  <span>{movieDetail?.Genre}</span>
                </div>
                <div>
                  <span>Languages</span>
                  <span>{movieDetail?.Language}</span>
                </div>
                <div>
                  <span>Awards</span>
                  <span>{movieDetail?.Awards}</span>
                </div>
              </div>
            </div>

            <div className={styles["section-right"]}>
              <img src={movieDetail?.Poster} alt="" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
