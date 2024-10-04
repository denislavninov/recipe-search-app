import { Routes, Route } from "react-router-dom";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/search-bar";
import { RecipeDetails } from "./modules/recipes/RecipeList/index";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/user" element={<h1>User Page</h1>} />
      <Route path="/settings" element={<h1>Setting Page</h1>} />
      <Route
        path="/"
        element={
          <>
            <SearchBar />
            <RecipeDetails />
            <RecipeList />
          </>
        }
      />
    </Routes>
  );
};
