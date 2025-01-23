import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import { AppRouter } from "./AppRouter";
import { UserProvider } from "./modules/user/UserContext";
import Container from "@mui/material/Container";
import { NavBar } from "./shared-component/navbar";
import "./App.css";

export const App = () => {

  return (
    <UserProvider>
      <RecipesProvider initialState={[]}>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppRouter />
          </Container>
      </RecipesProvider>
    </UserProvider>
  );
};
