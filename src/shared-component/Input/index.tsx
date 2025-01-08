import React, { ChangeEvent } from "react";
import "./styles.css";

interface InputProps {
  type: string;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, placeholder, name, id, value, onChange }: InputProps) => {
  return (
    <input
      type={type}
      className="shared-input"
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
};
