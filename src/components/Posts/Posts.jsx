import React from "react";
import Post from "../Post/Post";

const Posts = ( {posts} ) => {
  return (
    <div>
      {posts.map((p) => (
        <Post post={p}/>
      ))}
    </div>
  );
};

export default Posts;
