import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "bulma/css/bulma.min.css";
import "./Nav.css"

const Nav = () => {
  const [userContext, setUserContext] = useContext(UserContext);

const logoutHandler = () => {
  fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userContext.token}`,
    },
  }).then(async (response) => {
    setUserContext((prev) => ({ ...prev, details: undefined, token: null }));
  });
};


  return (
    <div className="top-nav">
    <div className="has-background-primary">
     
     
      {userContext.token ? (
        <ul className="navbar-menu has-text-white-ter is-flex is-justify-content-space-between is-align-content-center">
          <div>
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/newpost">New Post</Link>
          </li></div>
          <button className="button is-light button" text="Logout" intent="primary" onClick={logoutHandler}>Log out</button>
        </ul>
      ) : (
        <>
        <ul>
          <li className="button has-background-grey-dark has-text-white" style={{marginRight: "1rem"}}><Link to="/login">Login</Link></li>
          <li className="button has-background-grey-dark has-text-white"><Link to="/register">Register</Link></li>
        </ul>
          
         
        </>
      )}
    </div>
    </div>
  );
};

export default Nav;
