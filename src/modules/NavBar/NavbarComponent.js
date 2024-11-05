import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../user/UserContext";
import ProtectedRoute from "../recipes/ProtectedRoute";

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
          <NavLink to="/categories">Categories</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <ProtectedRoute>
                <NavLink to="/create-new-recipe">Create New Recipe</NavLink>
              </ProtectedRoute>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
