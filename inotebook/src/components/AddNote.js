import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
  const noteContext = useContext(NoteContext);
  const { addNote, fetchAllNotes } = noteContext;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const { isEdit } = props;
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <div className="container my-3">
      <h2>Add a note.</h2>

      <form className="my-3">
        <div className=" mb-3">
          <label htmlFor="title" className="form-label">
            <h3>Title</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="title"
            onChange={onChange}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="description" className="form-label">
            <h3>Description</h3>
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="tag" className="form-label">
            <h3>Tag</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            aria-describedby="tag"
            onChange={onChange}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
