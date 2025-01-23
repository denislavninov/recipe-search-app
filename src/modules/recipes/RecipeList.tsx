import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { RECIPE_ACTIONS, useRecipes, useRecipesDispatch } from "./RecipesProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchRecipesByIngredient } from "./recipeService";

export const RecipeList = () => {
  const recipes = useRecipes();
  const dispatch = useRecipesDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (recipes.length === 0) {
      fetchRecipesByIngredient("chicken").then((recipes) => {
        dispatch({ type: RECIPE_ACTIONS.update, payload: recipes });
      });
    }
  }, [recipes.length, dispatch])

  const handleClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  return Array.isArray(recipes) && recipes.length > 0 ? (
    <Box
      sx={{
        display: "flex,",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 2,
        overflowY: "auto",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={12} sx={{ m: 1 }}>
        {recipes.map((recipe) => (
          <ImageListItem key={recipe.idMeal} sx={{ m: 2 }} onClick={() => handleClick(recipe.idMeal)}>
            <img
              src={`${recipe.strMealThumb}`}
              alt={recipe.strMeal}
              loading="lazy"
              style={{ borderRadius: "2px", transition: "transform 0.4s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
            <ImageListItemBar
              title={recipe.strMeal}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))",
                variant: "standart",
                borderRadius: "2px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  ) : (
    <></>
  );
};
