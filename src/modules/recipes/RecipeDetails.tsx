import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipesById } from "./recipeService";
import { Recipe } from "./models/Recipe";

export const RecipeDetails = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeId) {
      fetchRecipesById(recipeId).then((recipe) => setSelectedRecipe(recipe));
    }
  }, [recipeId]);


  if (!selectedRecipe) return <></>;
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image={selectedRecipe.strMealThumb}
        alt={selectedRecipe.strMeal}
        sx={{ borderRadius: 2 }} // Rounded corners for the image
      />
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {selectedRecipe.strMeal}
        </Typography>
        <Typography variant="body1" component="p">
          {selectedRecipe.strInstructions}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h6" component="h3">Ingredients:</Typography>
          <ul>
            {Object.keys(selectedRecipe)
              .filter(
                (key) => key.startsWith("strIngredient"),
              )
              .map((key, index) => {
                const ingredient = (selectedRecipe as any)[key];
                const measure = (selectedRecipe as any)[`strMeasure${index + 1}`];
                if (!ingredient || !measure) return null;
                return (
                  <li key={key}>
                    <Typography variant="body2">
                      {ingredient} - {measure}
                    </Typography>
                  </li>
                );
              })}
          </ul>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back to Recipe List
        </Button>
      </CardContent>
    </Card>
  );
};
