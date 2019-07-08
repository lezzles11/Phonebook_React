import React from "react";
const Person = ({ person, toggleVisibility }) => {
  const label = person.visible
  ? 'delete' : 'do not delete'

  return (
    <div>
      <li>
        {" "}
        {person.name} {person.phone}{" "} 
        <button onClick={toggleVisibility}>{label}</button>
      </li>
    </div>
  );
};

export default Person;
