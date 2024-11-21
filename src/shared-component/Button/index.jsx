import React from "react";
import "./styles.css";
export const Button = ({ children, onClick }) => {
  return (
    <button className="shared-button" onClick={onClick}>
      {children}
    </button>
  );
};
