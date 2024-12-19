import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";

export const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();

  const handleRecipeClick = () => {
    console.log("Recipe Clicked", recipe);
    navigate(`/recipes/${recipe.idMeal}`);
  };

  return (
    <Card sx={{ maxWidth: 545 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleRecipeClick}>
          SEE RECIPE
        </Button>
      </CardActions>
    </Card>
  );
};
