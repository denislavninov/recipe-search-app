import React, { ReactNode, MouseEventHandler } from "react";
import "./styles.css";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="shared-button" onClick={onClick}>
      {children}
    </button>
  );
};
