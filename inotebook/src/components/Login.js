import React, { useState } from "react";

function Login() {
  const host = "http://localhost:5000";

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setCreds({ ...creds, [e.target.name]: e.target.value });
    console.log(creds);
  };

  const fetchData = (endPoint, method, body) => {
    return fetch(`${host}/api/auth/${endPoint}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData("login", "POST", creds);
    console.log(response);
  };
  return (
    <div className="container">
      <h2> Enter Login Details </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={creds.email}
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
            id="password"
            value={creds.password}
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
