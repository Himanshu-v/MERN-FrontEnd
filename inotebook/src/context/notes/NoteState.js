import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initNote = [];
  const [notes, setNotes] = useState(initNote);

  const apiCall = (endPoint, method, body) => {
    return fetch(`${host}/api/notes/${endPoint}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMGU1ODE1Nzc5YzNiYjkyMTUwMTMxIn0sImlhdCI6MTY0NDIyNTk3Mn0.qoiy2iZ1CddJojubyIxAUk0bX518-VUhfF7Jnr99V9U",
      },
      body: body,
    });
  };
  //Fetch all notes
  const fetchAllNotes = async () => {
    const response = await apiCall("fetchallnotes", "GET");
    let json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addNote = async (note) => {
    const response = await apiCall("createnote", "POST", JSON.stringify(note));
    if (!(response.status === 400 || response.status === 500)) {
      setNotes(notes.concat(note));
    }
  };
  //Delete a note.
  const deleteNote = async (id) => {
    const response = await apiCall(`deletenote/${id}`, "DELETE");
    if (!(response.status === 400 || response.status === 500))
      setNotes(notes.filter((note) => note._id !== id));
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log(notes);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    const response = await apiCall(
      `updatenote/${id}`,
      "PUT",
      JSON.stringify({ title, description, tag })
    );
    if (!(response.status === 400 || response.status === 500)) {
      setNotes(newNotes);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, fetchAllNotes, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
