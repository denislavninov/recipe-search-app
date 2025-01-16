import { Routes, Route, useNavigate } from "react-router-dom";
import { SearchBar } from "./modules/recipes/search-bar";
import { RecipeDetails } from "./modules/recipes/RecipeList/index";
import { CreateNewRecipe } from "./modules/recipes/NewRecipeForm/CreateRecipe";
import { Login } from "./modules/user/Login";
import { Register } from "./modules/user/Register";
import { Categories } from "./modules/recipes/Categories";
import { RecipeListByCategory } from "./modules/recipes/RecipeListByCategory";
import Logout from "./modules/user/Logout";
import { RecipeList } from "./modules/recipes/RecipeList";
import { useRecipes } from "./modules/recipes/RecipesProvider";

export const AppRouter = () => {
  const recipes = useRecipes();
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };
  // i f i dont define above the handleRecipeClick in the RecipeList component, it will not work, i need to define it here
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
            <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
          </>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
