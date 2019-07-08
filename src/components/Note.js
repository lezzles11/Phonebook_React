import React from 'react'
import './componentstyles.css'
const Note = ({ note, toggleImportance }) => {
    
    const label = note.important
    ? 'Delete' : 'Save'
    
    return (
        <li className='noteStyle'>
            {note.content}
            <button onClick={toggleImportance}>{label}</button> 
        </li>
    )
}
export default Note