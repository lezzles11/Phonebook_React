import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import axios from "axios";

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" }
  ]);

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
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length)

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhone,
      id: newPhone
    };
    if (persons.findIndex(person => person.name === newName) > -1) {
      console.log("Person already exists");
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewPhone("");
  };
  

  const filterChangeHandler = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const rows = () =>
    persons
      .filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map(person => <Person key={person.phone} person={person} />);

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
