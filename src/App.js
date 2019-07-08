import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import personService from './services/notes'
import axios from "axios";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState("");

  const peopleToShow = showAll
    ? persons
    : persons.filter(person => person.visible === false);

  useEffect(() => {
    console.log('currently changing the data!')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('Showing ' + (persons.length + 1) + ' number of people'); 
  
  const toggleVisibility = id => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, visible: !person.visible }
    
    personService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
    })
    .catch(error => {
      alert(`${person.name} was already invisible`)
      setPersons(persons.filter(p => p.id !== id))
    }) 
  }

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhone,
      visible: true
    };
    personService 
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('') 
      })
    }
    
  const filterChangeHandler = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  
  const rows = () =>
  peopleToShow
      .filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map(person => <Person 
      key={person.id} 
      person={person} 
      toggleImportance={() => toggleVisibility(person.visible)}
      />);

  const nameChangeHandler = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const phoneChangeHandler = event => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <input value={newFilter} onChange={filterChangeHandler} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "deleted" : "all"}
      </button>
      <h1> Phonebook </h1>
      <h1> Add New Contact </h1>

      <form onSubmit={addPerson}>
        Name:
        <input value={newName} onChange={nameChangeHandler} />
        <br />
        Phone:
        <input value={newPhone} onChange={phoneChangeHandler} />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h1>Numbers </h1>
      <div>{rows()}</div>
    </div>
  );
};

export default Phonebook;
