import { Routes, Route } from "react-router-dom";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/search-bar";
import { RecipeDetails } from "./modules/recipes/RecipeList/index";
import ProtectedRoute from "./modules/recipes/ProtectedRoute";
import { CreateNewRecipe } from "./modules/recipes/CreateRecipe";
import { useState } from "react";
import { Navbar } from "./modules/NavBar/NavbarComponent";

export const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <Navbar />
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
        <Route
          path="/create-new-recipe"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateNewRecipe />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </>
  );
};
