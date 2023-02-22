import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
`;

export default function FavMovieCard({ movie, removieFavMovie }) {
  return !movie.isFav ? null : (
    <div>
      <Card
        sx={{
          position: "relative",
          backgroundColor: "#363636",
          maxWidth: "245px",
          margin: "1em",
          // boxShadow: "3px 3px 10px gray",
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
          <MovieInfo>
            <Typography
              sx={{ fontSize: "13px", fontWeight: "700", color: "#cec2c6" }}
            >
              Year :{movie.Year}
            </Typography>
            <div onClick={removieFavMovie}>
              {!movie.isFav ? (
                <FavoriteBorderIcon fontSize="24" />
              ) : (
                <FavoriteIcon fontSize="24" sx={{ color: "red" }} />
              )}
            </div>
          </MovieInfo>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
