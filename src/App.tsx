import React, { useState } from "react";
import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { UserProvider } from "./modules/user/UserContext";
import Container from "@mui/material/Container";
import { NavBar } from "./shared-component/navbar/index";
import { UnstyledSnackbarIntroduction } from "./shared-component/MuiSnackBar/index";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";

export const App = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <UserProvider>
      <RecipesProvider initialState={[]}>
        <>
          <NavBar />

          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppRouter />
            <RecipeDetails />
            <UnstyledSnackbarIntroduction
              open={snackbarOpen}
              message={snackbarMessage}
              onClose={handleSnackbarClose}
            />
          </Container>
        </>
      </RecipesProvider>
    </UserProvider>
  );
};
