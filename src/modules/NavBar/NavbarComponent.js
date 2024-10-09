import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Recipe Search</NavLink>
        </li>

        <li>
          <NavLink to="/create-new-recipe">Create New Recipe </NavLink>
        </li>
        <li>
          <NavLink to="/rcipe-details">User</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};
