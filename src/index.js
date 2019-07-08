import React from "react";
import ReactDOM from "react-dom";
import NoteExample from "./NoteExample";
import axios from "axios";

axios.get("http://localhost:3001/notes").then(response => {
  const notes = response.data;
  console.log(notes);
});
const notes = [
  {
    id: 1,
    content: "To Do #1",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "To Do #2",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "To Do #3",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];
ReactDOM.render(<NoteExample notes={notes} />, document.getElementById("root"));
