import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../user/UserContext";

export const Navbar = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Recipe Search</NavLink>
        </li>
        <li>
          <NavLink to="recipes/categories">Categories</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="recipes/new">Create New Recipe</NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogout}>
                Log Out
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
