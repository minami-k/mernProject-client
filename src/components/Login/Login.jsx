import { Button, FormGroup, InputGroup, Callout } from "@blueprintjs/core";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  // useEffect(() => console.log(userContext), [userContext])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Missing Credentials");
          } else if (response.status === 401) {
            setError("Invalid email and/or password");
          } else {
            setError("Something went wrong! Please try again");
          }
        } else {
          const data = await response.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
          data && window.location.replace("/");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError("Something went wrong! Please try again"); //generic error message
      });
  };

  return (
    <>
      {error && <Callout intent="danger">{error}</Callout>}
      <div className="form">
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          fill
          loading={isSubmitting}
          type="submit"
          text="Sign In"
        />
      </form>
      <div className="mt-5">
      <p>Sign up ?</p>
      <button className="button login-button">
        <Link to="/register">register</Link>
      </button>
      </div>
      </div>
    </>
  );
};

export default Login;
