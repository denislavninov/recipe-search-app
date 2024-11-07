import { Routes, Route } from "react-router-dom";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/search-bar";
import { RecipeDetails } from "./modules/recipes/RecipeList/index";
import ProtectedRoute from "./modules/recipes/ProtectedRoute";
import { CreateNewRecipe } from "./modules/recipes/CreateRecipe";
import { useState } from "react";
import { Categories } from "./modules/categories/Categories";
import { RecipeListByCategory } from "./modules/categories/RecipeListByCategory";
import { Login } from "./modules/user/Login";
export const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/recipes">
        <Route path="new" element={<CreateNewRecipe />} />
        <Route path=":recipeId" element={<RecipeDetails />} />
        <Route path="categories">
          <Route path=":categoryId" element={<RecipeListByCategory />} />
          <Route index element={<Categories />} />
        </Route>
      </Route>

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
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
