import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const fetchData = (endPoint, method, body) => {
    return fetch(`${host}/api/auth/${endPoint}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchData("createuser", "POST", creds);
    let auth = await response.json();

    if (response.status === 200) {
      console.log(auth);
      localStorage.setItem("auth-token", response.authtoken);
      navigate("/login");
      props.showAlert("Sign up Successfull. Login to see notes.", "success");
    } else {
      props.showAlert("Invalid credentials", "warning");
    }
  };
  return (
    <>
      <div
        className="container"
        //  style={{ backgroundColor: "red", height: "50px" }}
      >
        <h3> Sign up with personal details. </h3>
      </div>
      <div
        className="container" //style={{ backgroundColor: "grey" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={creds.name}
              onChange={onChange}
              aria-describedby="text"
            />
          </div>
          <div className="mb-3 my-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={creds.email}
              id="email"
              name="email"
              onChange={onChange}
              required
              minLength={5}
              aria-describedby="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={creds.password}
              id="password"
              onChange={onChange}
              required
              minLength={5}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
