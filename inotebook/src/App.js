import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        {" "}
        <Router>
          <Navbar />{" "}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
            </Routes>
            <Routes>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
