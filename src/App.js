import { RecipeList } from "./modules/recipes/RecipeList";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { Navbar } from "./modules/NavBar/NavbarComponent";
import { UserProvider } from "./modules/user/UserContext";
import { RecipeProvider } from "./modules/recipes/NewRecipeForm/RecipeContext";

export const App = () => {
  return (
    <UserProvider>
      <RecipeProvider>
        <>
          <Navbar />
          <div className="container">
            <AppRouter />
          </div>
        </>
      </RecipeProvider>
    </UserProvider>
  );
};
