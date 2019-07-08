import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Note from './components/Note'
import noteService from './services/notes'
import './styles.css'
import Notification from './components/Notification'

const NoteExample = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("a new note")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {        
          setNotes(initialNotes)      
        })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(          
          `Note '${note.content}' was already removed from server`        
          )        
          setTimeout(() => {          
            setErrorMessage(null)        
          }, 5000)        
          setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll    
  ? notes    
  : notes.filter(note => note.important === true)
  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}    />
  )
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {        
          setNotes(notes.concat(returnedNote))        
          setNewNote('')
      })
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
    
  }
  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
          Show {showAll ? 'Saved' : 'Deleted' }
        </button>
      </div>
      <ul>
       {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit"> save</button>
      </form>
    </div>
  )
}

export default NoteExample 