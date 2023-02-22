import { React } from "react";
import MovieListing from "../../components/MovieListing/MovieListing";
import Lottie from "lottie-react";
import movie from "../assests/lf30_editor_zjlrcvmc.json";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";
import Typography from "@mui/material/Typography";

export default function Home() {
  const text = useSelector((state) => state.movie.searchQuery);
  console.log("text", text.length);
  return (
    <div>
      <MovieListing />
      {text.length === 0 ? (
        <div>
          <div className={styles.paragraph}>
            <Typography variant="h2" sx={{ color: "#cec2c6" }}>
              Search Your{" "}
              <span style={{ fontWeight: "bold", color: "crimson" }}>
                Favourite
              </span>{" "}
              Movie...
            </Typography>
          </div>

          <div className={styles.pic}>
            <Lottie animationData={movie} loop={true} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
