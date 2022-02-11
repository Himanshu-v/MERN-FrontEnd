import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
function Notes(props) {
  const noteContext = useContext(NoteContext);
  const { notes, editNote, deleteNote, fetchAllNotes } = noteContext;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "Def",
  });
  const { showAlert } = props;
  const navigate = useNavigate();

  const updateNote = async (currentNote) => {
    const { _id, title, description, tag } = currentNote;

    ref.current.click();
    await setNote({
      id: _id,
      etitle: title,
      edescription: description,
      etag: tag,
    });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleUpdateNote = (e) => {
    const { id, etitle, edescription, etag } = note;
    console.log(note);
    editNote(id, etitle, edescription, etag);
    refClose.current.click();
    showAlert("Updated Successfully", "success");
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    showAlert("Deleted Successfully", "success");
  };

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      fetchAllNotes();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        hidden="true"
      >
        Open edit modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className=" mb-3">
                  <label htmlFor="etitle" className="form-label">
                    <h3>Title</h3>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className=" mb-3">
                  <label htmlFor="edescription" className="form-label">
                    <h3>Description</h3>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className=" mb-3">
                  <label htmlFor="etag" className="form-label">
                    <h3>Tag</h3>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateNote}
              >
                Update Note!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes:</h2>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              handleDelete={handleDelete}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
