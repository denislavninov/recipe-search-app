import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesByCategory } from "../recipes/recipeService"; // Create this function to fetch recipes by category

export const RecipeListByCategory = () => {
  const { category } = useParams(); // Get the category from the URL
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipesByCategory(category); // Fetch recipes by category
        setRecipes(fetchedRecipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [category]);

  if (loading) return <h2>Loading Recipes...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>Recipes in {category}</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>{recipe.strMeal}</li> // Display recipe names
        ))}
      </ul>
    </div>
  );
};
