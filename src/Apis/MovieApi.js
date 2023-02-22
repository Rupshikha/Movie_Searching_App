import {React,useEffect,useState} from 'react';
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import { addMovies } from '../store/MovieSlice';

export default function MovieApi() {
    // const [post, setPost]=useState(null);
    const movieList=useSelector((state)=>state.movie.movieList);
    const dispatch=useDispatch();
    useEffect(()=>{
       const fetchMovies=async()=>{
        const response= axios
        .get("http://www.omdbapi.com/?i=tt3896198&apikey=45ab3312")
        .catch((err)=>{
          console.log("err",err);
        })          
            // setPost(response.data)
            dispatch(addMovies(response.data));

      }
      fetchMovies();
       },[]);
      //  console.log("post",post);
      
       
       


  return (
    <div>
       <h1>{movieList}</h1>
    </div>
  )
}
