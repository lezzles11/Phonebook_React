import React from "react";

const Filter = ({ value, changeHandler }) => {
  return (
    <div>
      filter shown with
      <input name={name} value={value} onChange={changeHandler} type="search" />
    </div>
  );
};

export default Filter;
