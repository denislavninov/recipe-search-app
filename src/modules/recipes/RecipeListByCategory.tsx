import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRecipesByCategory } from "./recipeService";
import { Recipe } from "./models/Recipe";

export const RecipeListByCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categoryId) {
      const getRecipes = async () => {
        try {
          const fetchedRecipes = await fetchRecipesByCategory(categoryId);
          setRecipes(fetchedRecipes);

        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      getRecipes();
    }
  }, [categoryId]);

  if (loading) return <h2>Loading Recipes...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="recipe-list">
      <ul>
        <h2>Recipes in the category "{categoryId}"</h2>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal} className="recipe-item" data-testid={`recipe-${recipe.idMeal}`}>
            <Link to={`/recipes/${recipe.idMeal}`}>{recipe.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
