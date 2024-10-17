import { Routes, Route } from "react-router-dom";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/search-bar";
import { RecipeDetails } from "./modules/recipes/RecipeList/index";
import ProtectedRoute from "./modules/recipes/ProtectedRoute";
import { CreateNewRecipe } from "./modules/recipes/CreateRecipe";
import { useState } from "react";
import { Navbar } from "./modules/NavBar/NavbarComponent";
import { Categories } from "./modules/categories/Categories";
import { RecipeListByCategory } from "./modules/categories/RecipeListByCategory";

export const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/user" element={<h1>User Page</h1>} />
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
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/recipes/:category" element={<RecipeListByCategory />} />
      </Routes>
    </>
  );
};
