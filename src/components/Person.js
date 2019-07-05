import React from "react";
const Person = ({ person }) => {
  return (
    <div>
      <li>
        {" "}
        {person.name} {person.phone}{" "}
      </li>
    </div>
  );
};

export default Person;
