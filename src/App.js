import React from "react";
import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import CreateNewRecipe from "./modules/recipes/NewRecipeForm/CreateRecipe";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { Navbar } from "./modules/NavBar/NavbarComponent";
import { UserProvider } from "./modules/user/UserContext";

export const App = () => {
  return (
    <UserProvider>
      <RecipesProvider initialState={[]}>
        <>
          <Navbar />
          <div className="container">
            <AppRouter />
          </div>
        </>
      </RecipesProvider>
    </UserProvider>
  );
};
