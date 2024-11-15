import React from "react";
import "../../App.css"; // Ensure to import the CSS file

export const Button = ({ children, onClick }) => {
  return (
    <button className="shared-button" onClick={onClick}>
      {children}
    </button>
  );
};
