import { RecipeList } from "./modules/recipes/RecipeList";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { Navbar } from "./modules/NavBar/NavbarComponent";
import { UserProvider } from "./modules/user/UserContext";

export const App = () => {
  return (
    <UserProvider>
      <>
        <Navbar />
        <div className="container">
          <AppRouter />
        </div>
      </>
    </UserProvider>
  );
};
