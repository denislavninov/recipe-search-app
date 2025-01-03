import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRecipesByCategory } from "./recipeService"; // Create this function to fetch recipes by category

interface Recipe {
  idMeal: string;
  strMeal: string;
  // Add other properties as needed
}

export const RecipeListByCategory = () => {
  const { category } = useParams(); // Get the category from the URL
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        if (typeof category === 'string') { // Type guard
          const fetchedRecipes = await fetchRecipesByCategory(category);
          setRecipes(fetchedRecipes);
        } else {
          setError("Category is not a valid string");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [category]);

  if (loading) return <h2>Loading Recipes...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="recipe-list">
      <ul>
        <h2>Recipes in {category}</h2>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal} className="recipe-item">
            {/* {recipe.strMeal} */}
            <Link to={`/recipe/${recipe.strMeal}`}>{recipe.strMeal}</Link>
          </li> // Display recipe names
        ))}
      </ul>
    </div>
  );
};
