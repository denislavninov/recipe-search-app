import { Routes, Route } from "react-router-dom";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/search-bar";
import { RecipeDetails } from "./modules/recipes/RecipeList/index";
import ProtectedRoute from "./modules/recipes/ProtectedRoute";
import { CreateNewRecipe } from "./modules/recipes/CreateRecipe";
import { useState } from "react";
import { Categories } from "./modules/categories/Categories";
import { RecipeListByCategory } from "./modules/categories/RecipeListByCategory";
import { UserProvider } from "./modules/user/UserContext";

export const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<h1>Login Page Placeholder</h1>} />

          <Route path="/categories" element={<Categories />} />
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
          <Route
            path="/create-new-recipe"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreateNewRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/recipes/:category" element={<RecipeListByCategory />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </UserProvider>
    </>
  );
};
