import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
function Notes() {
  const noteContext = useContext(NoteContext);
  const { notes, setNotes } = noteContext;
  return (
    <div className="row my-3">
      <h2>Your notes</h2>
      {notes.map((note) => {
        return <Noteitem note={note} />;
      })}
    </div>
  );
}

export default Notes;
