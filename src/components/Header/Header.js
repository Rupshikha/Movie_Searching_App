import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { addTitle } from "../../store/MovieSlice";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  appcolor: {
    backgroundColor: "#3F3A3A",
  },
}));

export default function Header() {
  let timer;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(addTitle(value));
    }, 500);
    console.log(value);
  };

  return (
    <div className={classes.root}>
      <AppBar color="secondary" className={classes.appcolor} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            sx={{ marginLeft: "" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h5"> MovieApp</Typography>
            </Link>
          </Typography>
          <div>
            {" "}
            <Link
              to={"/favmovie"}
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "2em",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <FavoriteIcon />
              <Typography
                sx={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Favourite Movie
              </Typography>
            </Link>
          </div>

          <div className={classes.search} sx={{ padding: "0 8em" }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
