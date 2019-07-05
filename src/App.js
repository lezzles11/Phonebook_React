import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import axios from "axios";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  {
    /* const [persons, setPersons] = useState([]); */
  }
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState("");
  {
    /* 
  const peopleToShow = showAll
    ? persons
    : persons.filter(person => person.name === null);
*/
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhone, 
      visible: true
    };
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
  };
  
  const visible = ({ person, toggleVisibility }) => {
    const label = person.visible
      ? 'make not visible' : 'make visible'
      return (
        <li>
          {person.name}{person.phone}
          <button onClick={toggleVisibility}>{label} </button>
        </li>
      )
  }

  const filterChangeHandler = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const toggleVisibilityOf = id => {
    // the unique url for each person based on id 
    const url = `http://localhost:3001/persons/${id}`
    // find the person we want to modify, and assign it a variable
    const person = persons.find(p => p.id === id)
    // create a new object, excluding the visibility property 
    const changedPerson = {...person, visible: !person.visible }
    // create new object, and put it back 
    axios.put(url, changedPerson).then(response => {
      // creates new array, except for the old note, but that is updated by the map method
      setPersons(persons.map(person => person.id !== id ? person : response.data))
    })
  }
  const rows = () =>
    persons
      .filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map(person => <Person 
      key={person.phone} 
      person={person}
      toggleVisibility = {() => toggleVisibilityOf(person.id)} />);

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
        show {showAll ? "important" : "all"}
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
