import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../Login/Login.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    fetch(process.env.REACT_APP_API_ENDPOINT + "posts/newpost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, image }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);

        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the missing fields");
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
      <div className="form">
        <form
          onClick={formSubmitHandler}
          method="post"
          className="box container"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          <div className="field">
            <label for="title" class="label">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>

          <div className="field">
            <label for="title" className="label">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input"
            />
          </div>
          <div className="field">
            <label for="title" className="label">
              Description
            </label>
            <textarea
              className="textarea"
              name="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              description
            </textarea>
          </div>
          <button
            type="submit"
            fill
            loading={isSubmitting}
            className="button is-dark is-hovered"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
