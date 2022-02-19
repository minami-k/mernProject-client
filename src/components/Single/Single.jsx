import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router" 
import axios from "axios"

const Single = () => {
const location = useLocation()
const path = location.pathname.split('/')[2]
const [post, setPost] = useState({})

useEffect (() => {
  const getPost = () => {
    const res = axios.get("/posts/"+ path)
    setPost(res.data)
    console.log(res);
  }
  getPost()
}, [path])


  return (
    <div>Single</div>
  )
}

export default Single