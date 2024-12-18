import React from "react";
import "./styles.css";

export const Input = ({ type, placeholder, name, id, value, onChange }) => {
  return (
    <input
      type={type}
      className="shared-input"
      placeholder={placeholder}
      name={name} // Ensure to include the name prop
      id={id} // Ensure to include the id prop
      value={value}
      onChange={onChange}
    />
  );
};
