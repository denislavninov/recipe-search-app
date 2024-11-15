import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          email: action.payload.email,
        }),
      );
      return { ...state, user: action.payload };
    // Add other cases as needed
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
