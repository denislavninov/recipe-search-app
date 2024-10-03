import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/search-bar";
import {
  fetchRecipesByIngredient,
  fetchRecipesById,
} from "./modules/recipes/recipeService";
import "./App.css";
import { useState, useEffect } from "react";
import {
  useRecipesDispatch,
  RECIPE_ACTIONS,
  useRecipes,
} from "./modules/recipes/RecipesProvider";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipes = useRecipes();
  const dispatch = useRecipesDispatch();

  useEffect(() => {
    fetchRecipesByIngredient("chicken_breast").then((recipes) =>
      dispatch({ type: RECIPE_ACTIONS.update, payload: recipes }),
    );
  }, []);

  const handleRecipeClick = (idMeal) => {
    fetchRecipesById(idMeal)
      .then((recipeDetails) => {
        console.log("Fetched recipe details:", recipeDetails);
        console.log("Recipe ID to fetch details:", idMeal);
        setSelectedRecipe(recipeDetails);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  return (
    <div className="container">
      <header>Recipe Search App</header>
      <SearchBar />
      {selectedRecipe ? (
        <div className="recipe-details">
          <h2>{selectedRecipe.strMeal}</h2>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
          ></img>
          <p>{selectedRecipe.strInstructions}</p>
          <ul>
            {Object.keys(selectedRecipe)
              .filter(
                (key) => key.startsWith("strIngredient") && selectedRecipe[key],
              )
              .map((key) => (
                <li key={key}>{selectedRecipe[key]}</li>
              ))}
          </ul>
          <button onClick={() => setSelectedRecipe(null)}>
            Back to Recipe List
          </button>
        </div>
      ) : (
        <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      )}
    </div>
  );
};
