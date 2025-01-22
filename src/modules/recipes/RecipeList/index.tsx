import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import {
  useRecipesDispatch,
  RECIPE_ACTIONS,
  useRecipes,
} from "../RecipesProvider";
import { fetchRecipesByIngredient, fetchRecipesById } from "../recipeService";
import { RecipeList } from "../RecipeList";
import { Recipe } from "../models/recipe";

export const RecipeDetails = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const recipes = useRecipes();
  const dispatch = useRecipesDispatch();

  useEffect(() => {
    fetchRecipesByIngredient("chicken_breast").then((recipes) =>
      dispatch({ type: RECIPE_ACTIONS.update, payload: recipes }),
    );
  }, [dispatch]);

  const handleRecipeClick = (idMeal: string) => {
    fetchRecipesById(idMeal)
      .then((recipeDetails) => {
        console.log("Fetched recipe details:", recipeDetails);
        console.log("Recipe ID to fetch details:", idMeal);
        setSelectedRecipe(recipeDetails);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  // Validate recipes before rendering
  // const validateRecipes = (recipes: any[]): Recipe[] => {
  //   return recipes.map((recipe) => ({
  //     idMeal: recipe.idMeal || "",
  //     strMeal: recipe.strMeal || "",
  //     strMealThumb: recipe.strMealThumb || "default-image-url", // Provide a default image if missing
  //     strInstructions: recipe.strInstructions || "No instructions available.",
  //     ...recipe,
  //   }));
  // };

  // const validatedRecipes = validateRecipes(recipes);

  return (
    <>
      {selectedRecipe ? (
        <Card sx={{ maxWidth: 600, margin: "auto", padding: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            sx={{ borderRadius: 2 }} // Rounded corners for the image
          />
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {selectedRecipe.strMeal}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedRecipe.strInstructions}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="h6">Ingredients:</Typography>
              <ul>
                {Object.keys(selectedRecipe)
                  .filter(
                    (key) =>
                      key.startsWith("strIngredient") && selectedRecipe[key],
                  )
                  .map((key) => (
                    <li key={key}>
                      <Typography variant="body2">
                        {selectedRecipe[key]}
                      </Typography>
                    </li>
                  ))}
              </ul>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedRecipe(null)}
            >
              Back to Recipe List
            </Button>
          </CardContent>
        </Card>
      ) : (
        <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      )}
    </>
  );
};

