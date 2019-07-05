import React, { useState } from "react";
import Note from "./components/Note";
import Name from "./components/Name";

const App = props => {
  // setNotes initializes the piece of state stored in notes
  // that is passed in the props
  const [notes, setNotes] = useState(props.notes);
  const [names, setNames] = useState(props.names);

  const [newNumber, setNewNumber] = useState("");
  // newNote's state reflects the initial value
  const [newNote, setNewNote] = useState([]);
  // can also do useState([]) for empty array
  const [newName, setNewName] = useState("");

  const [showPerson, setShowPerson] = useState([{ name: "Arto Hellas" }]);

  const [showAll, setShowAll] = useState(true);

  const rows = () => notes.map(note => <Note key={note.id} note={note} />);
  const rows2 = () => names.map(name => <Name key={name.number} name={name} />);
  // Create an event handler for input - this is called everytime a change
  //occurs in the input element. Also receives event as parameter.
  // TARGET REFERS TO INPUT ELEMENT. did not need to call event.preventDefault() because unlike form, no default action occurs on input change
  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
      date: new Date().toISOString(),
      number: newNumber
    };
    setNames(names.concat(nameObject));
    setNewName("");
  };
  // this function creates new notes
  // this parameter is the one that triggers the call to the event handler
  // addNote is an EVENT HANDLER to the form element
  const addNote = event => {
    //will call preventDefault() which prevents default action of submitting form
    event.preventDefault();
    //without preventdefault, page will reload
    // console.log is logged (you can see it)
    console.log("button clicked", event.target);
    //create new object, noteObject that will receive content from newNote state
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      // note has 50% chance of being marked as important
      important: Math.random > 0.5,
      // id is generated based on total number of notes
      id: notes.length + 1
    };
    // new note is added to the list of notes by using the concat method
    // this method does not mutate original notes - but rather copies a new copy of array with the new
    // item added to the end
    setNotes(notes.concat(noteObject));
    // resets the value of the controlled input by called setNewNote function of NewNote state
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {/* displayed notes that is important is controlled by this button 
        event handler for the button that it is defined within the attribute
        of the button element */}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>{rows()}</ul>
      <ul>{rows2()}</ul>

      {/* corresponds to "button clicked", event.target
    which means that when you hit button, submit will happen */}
      <form onSubmit={addNote}>
        {/* For input, you cannot just have value there, because the App
      component will then control the behavior of the input. You want an event
      handler to do that. */}
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit"> Save </button>
      </form>

      <form onSubmit={addName}>
        {/* For input, you cannot just have value there, because the App
component will then control the behavior of the input. You want an event
handler to do that. */}
        <input value={newName} onChange={handleNewName} />
        <input value={newNumber} onChange={handleNewNumber} />
        <button type="submit"> Save </button>
      </form>
    </div>
  );
};

export default App;
