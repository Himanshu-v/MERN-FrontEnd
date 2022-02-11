import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AuthContext from "../Auth/AuthContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initNote = [];
  const [notes, setNotes] = useState(initNote);
  const authContext = useContext(AuthContext);
  const { authtoken, setAuthentication } = authContext;

  const apiCall = (endPoint, method, body) => {
    return fetch(`${host}/api/notes/${endPoint}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken ? authtoken : localStorage.getItem("authtoken"),
      },
      body: body,
    });
  };
  //Fetch all notes

  const fetchAllNotes = async () => {
    if (!authtoken && localStorage.getItem("authtoken") !== null) {
      setAuthentication(localStorage.getItem("authtoken"));
    }
    if (authtoken || localStorage.getItem("authtoken") !== null) {
      var response = await apiCall("fetchallnotes", "GET");
      if (response.status === 200) {
        let json = await response.json();
        setNotes(json);
      }
    }
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
