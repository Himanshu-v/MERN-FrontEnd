import React from "react";

function Signup() {
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
        <form>
          <div className="mb-3">
            <label for="text" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              aria-describedby="text"
            />
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="email"
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
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
