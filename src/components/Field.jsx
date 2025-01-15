import React from "react";

const Field = ({ label, name, value }) => {
  return (
    <div className="field">
      <label htmlFor="">{label}</label>
      <input type="text" name={name} defaultValue={value}></input>
    </div>
  );
};

export default Field;
