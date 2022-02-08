import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
function About() {
  const note = useContext(NoteContext);
  useEffect(() => {
    note.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is about {note.state.title} and {note.state.description}!!
    </div>
  );
}

export default About;
