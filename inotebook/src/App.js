import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthState from "./context/Auth/AuthState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      {" "}
      <Router>
        <AuthState>
          <NoteState>
            <Navbar /> <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home showAlert={showAlert} />}
                ></Route>
              </Routes>
              <Routes>
                <Route
                  exact
                  path="/about"
                  element={<About showAlert={showAlert} />}
                ></Route>
              </Routes>
              <Routes>
                <Route
                  exact
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                ></Route>
              </Routes>
              <Routes>
                <Route
                  exact
                  path="/signup"
                  element={<Signup showAlert={showAlert} />}
                ></Route>
              </Routes>
            </div>
          </NoteState>
        </AuthState>
      </Router>
    </>
  );
}

export default App;
