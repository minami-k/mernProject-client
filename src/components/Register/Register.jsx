import { Button, FormGroup, InputGroup, Callout } from "@blueprintjs/core";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "../Login/Login.css"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username: email, password }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);

        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the missing fields");
          } else if (response.status === 401) {
            setError("Invalid email and/or password");
          } else if (response.status === 500) {
            const data = await response.json();
            if (data.message) {
              setError(
                data.message || "Something went wrong! Please try again"
              );
            } else {
              setError("Something went wrong! Please try again");
            }
          } else {
            setError("Something went wrong! Please try again");
          }
        } else {
          const data = await response.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));

          data && window.location.replace("/login")
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
        <FormGroup label="First Name" labelFor="firstName">
          <InputGroup
            id="firstName"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Last Name" labelFor="lastName">
          <InputGroup
            id="lastName"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
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
          loading={isSubmitting}
          fill
          type="submit"
          text="Register"
        />
      </form>
      <p>Already have an account ?</p>
      <button className="button login-button">
        <Link to="/login">Login</Link>
      </button>
      </div>
    </>
  );
};

export default Register;
