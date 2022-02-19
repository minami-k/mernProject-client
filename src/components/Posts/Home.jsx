import React, {useState, useEffect, useCallback, useContext,} from "react";
import { UserContext } from "../../context/UserContext";

import axios from "axios"
import Posts from "./Posts"

import "bulma/css/bulma.min.css";
import "./Home.css"

const Home = () => {
const [posts, setPosts] = useState([])

useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts")
      console.log(res);
      setPosts(res.data)
    }
    fetchPosts()
  }, [])


  return (
    
      <div className="home">
      <h1 className="has-text-centered">Welcome to home</h1>
      <Posts posts={posts}/>

      </div>
  );
};

export default Home;
