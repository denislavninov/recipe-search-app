import React from "react";
import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { UserProvider } from "./modules/user/UserContext";
import Container from "@mui/material/Container";
import { NavBar } from "./shared-component/Navbar";
import { UnstyledSnackbarIntroduction } from "./shared-component/MuiSnackBar/index";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";

export const App = () => {
  return (
    <UserProvider>
      <RecipesProvider initialState={[]}>
        <>
          <NavBar />

          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppRouter />
            <RecipeDetails />
            <UnstyledSnackbarIntroduction />
          </Container>
        </>
      </RecipesProvider>
    </UserProvider>
  );
};
