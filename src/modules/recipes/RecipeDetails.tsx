import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export const RecipeDetails = ({ selectedRecipe, onBack }) => {
  if (!selectedRecipe) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image={selectedRecipe.strMealThumb}
        alt={selectedRecipe.strMeal}
        sx={{ borderRadius: 2 }}
      />
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {selectedRecipe.strMeal}
        </Typography>
        <Typography variant="body1" paragraph>
          {selectedRecipe.strInstructions}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={onBack}>
            Back to Recipe List
          </Button>
          <Typography variant="caption" display="block" marginTop={2}>
            Recipe ID: {selectedRecipe.id}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
