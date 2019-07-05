import React from "react";
import ReactDOM from "react-dom";
import Phonebook from "./App";
import axios from 'axios';

axios.get('http://localhost:3001/persons').then(response => {
    const persons = response.data 
    ReactDOM.render(<Phonebook />, document.getElementById("root"));
})

