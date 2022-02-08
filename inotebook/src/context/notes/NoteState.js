import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initNote = [
    {
      title: "Being what?",
      description: "Make what?",
    },
    {
      title: "Being what?",
      description: "Make what?",
    },
    {
      title: "Being what?",
      description: "Make what?",
    },
    ,
    {
      title: "Being what?",
      description: "Make what?",
    },
    ,
    {
      title: "Being what?",
      description: "Make what?",
    },
    ,
    {
      title: "Being what?",
      description: "Make what?",
    },
    ,
    {
      title: "Being what?",
      description: "Make what?",
    },
  ];
  const [notes, setNotes] = useState(initNote);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
