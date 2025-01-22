import React, { createContext, useReducer, useContext, Dispatch } from "react";

interface User {
  name?: string;
  email: string;
  password?: string;
}

interface UserState {
  user: User | null;
  users: User[];
}

type UserAction = {
  type: "REGISTER_USER" | "LOGIN" | "LOGOUT";
  payload?: User;
};

const UserContext = createContext<UserState | undefined>(undefined);
export const UserDispatchContext = createContext<Dispatch<UserAction> | undefined>(undefined);

const initialState: UserState = {
  user: null,
  users: [],
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "REGISTER_USER":
      const newUser = {
        name: action.payload?.name || "",
        email: action.payload?.email || "",
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      return { ...state, user: newUser, users: [...state.users, newUser] };
    case "LOGIN":
      const loggedInUser = {
        name: action.payload?.name || "",
        email: action.payload?.email || "",
      };
      return { ...state, user: loggedInUser };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
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

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};
