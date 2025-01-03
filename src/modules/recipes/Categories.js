import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
// ... existing imports ...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  fetchRecipesByCategory,
} from "../../modules/recipes/recipeService";
import { RecipeDetails } from "../../modules/recipes/RecipeDetails";

export const Categories = () => {
  // Fetch categories from API and display them
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleCategorySelect = async (categoryName) => {
    navigate(`/recipes/${categoryName}`);
    // Fetch recipes for the selected category
    try {
      setRecipeLoading(true);
      const fetchedRecipes = await fetchRecipesByCategory(categoryName);
      setRecipes(fetchedRecipes);
    } catch (err) {
      setError(err.message);
    } finally {
      setRecipeLoading(false);
    }
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  if (loading) return <h2>Loading Categories...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      {selectedRecipe ? (
        <RecipeDetails selectedRecipe={selectedRecipe} onBack={handleBack} />
      ) : (
        <>
          <h2>Categories</h2>
          <Grid container spacing={6}>
            {categories.map((category) => (
              <Grid item xs={12} sm={3} md={2} key={category.idCategory}>
                <Card
                  onClick={() => handleCategorySelect(category.strCategory)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={category.strCategoryThumb}
                    alt={category.strCategory}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    sx={{
                      transition: "transform 0.4s",
                      cursor: "pointer",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {category.strCategory}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {recipeLoading ? (
            <h2>Loading Recipes...</h2>
          ) : (
            recipes.length > 0 && (
              <div className="recipe-list">
                <ul>
                  <h2>Recipes in Selected Category</h2>
                  {recipes.map((recipe) => (
                    <li
                      className="recipe-item"
                      key={recipe.idMeal}
                      onClick={() => handleRecipeSelect(recipe)}
                    >
                      {recipe.strMeal}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};
