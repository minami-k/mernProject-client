import { Card, Tab, Tabs } from "@blueprintjs/core";
import { useState, useContext, useEffect, useCallback } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import Nav from "./components/Nav/Nav";
import Home from "./components/Posts/Home";
import Single from "./components/Single/Single";
import NewPost from "./components/NewPost/NewPost";

function App() {
 //  const [currentTab, setCurrentTab] = useState("login")
  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + 'users/refreshtoken', {
      method: 'POST',
      credentials: "include",
      header: { "Content-Type":"application/json"}
    }).then( async response => {
      if(response.ok){
        const data = await response.json()
        setUserContext(prev => ({ ...prev, token: data.token }))
      }else{
        setUserContext(prev => ({ ...prev, token: null }))
      }

      setTimeout(verifyUser, 5 * 30 * 1000) //call refreshtoken every 5 minutes to renew token
    })
  }, [setUserContext])

  useEffect(() => verifyUser(), [verifyUser])

  const syncLogout = useCallback(event => {
    if(event.key === 'logout'){
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)

    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout]) 

  return (
    <div>
   {/*       {userContext.token === null ? (<>
        <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
          <Tab id="login" title="Login" panel={<Login />}/>
          <Tab id="register" title="Register" panel={<Register />}/>
        </Tabs>
 

    </> ) : userContext.token ? (<Welcome />) : (<div>Loading.....</div>)} */}
 
    <Router>
      <Nav />
      <Routes>
        <Route index element={userContext.token ?  <Home /> :<Login />} />
        <Route path="/login" element={userContext.token ? <Home /> : <Login />} />
        <Route path="/register" element={userContext.token ? <Home /> : <Register />} />
        <Route path="/newpost" element={userContext.token? <NewPost /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />

      </Routes>
    </Router>
    

     </div>
  );
}

export default App;
