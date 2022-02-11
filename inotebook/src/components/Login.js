import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
function Login(props) {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const { authtoken, setAuthentication } = authContext;

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
    console.log(creds);
    const response = await fetchData("login", "POST", creds);
    console.log(response);

    let auth = await response.json();

    if (response.status === 200) {
      console.log(auth);
      localStorage.setItem("authtoken", auth.authtoken);
      console.log(("authtoken", auth.authtoken));
      await setAuthentication(auth.authtoken);
      console.log(authtoken);
      navigate("/");
      props.showAlert("Login Successfull", "success");
    } else {
      props.showAlert("Invalid credentials", "warning");
    }
  };
  return (
    <div>
      <div style={{ height: "30px" }}></div>
      <h2> Enter Login Details </h2>
      <form onSubmit={handleSubmit}>
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
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
