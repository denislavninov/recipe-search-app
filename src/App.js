import { RecipeList } from "./modules/recipes/RecipeList";
import "./App.css";
import { AppRouter } from "./AppRouter";

export const App = () => {
  return (
    <div className="container">
      <header>Recipe Search App</header>
      <AppRouter />
    </div>
  );
};
