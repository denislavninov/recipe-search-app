import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext();
const UserDispatchContext = createContext();

const initialState = {
  user: null,
  users: [],
};

const userReducer = (state, action) => {
  if (action.type === "REGISTER_USER") {
    const newUser = {
      name: action.payload.name,
      email: action.payload.email,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    return { ...state, user: newUser, users: [...state.users, newUser] };
  }

  if (action.type === "LOGIN") {
    const loggedInUser = {
      email: action.payload.username,
    };
    return { ...state, user: loggedInUser };
  }

  if (action.type === "LOGOUT") {
    return { ...state, user: null };
  }
  return state;
};

export default UserContext;

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};

export const useUserDispatch = () => useContext(UserDispatchContext);
