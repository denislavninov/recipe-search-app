import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // Add other properties as needed
}

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeClick: (recipeId: string) => void;
}

export const RecipeList = ({ recipes, onRecipeClick }: RecipeListProps) => {
  console.log("Recipes:", recipes); // Debug: Check if recipes are being passed correctly
  console.log("onRecipeClick:", onRecipeClick); // Debug: Check if onRecipeClick is a function

  const handleClick = (recipeId: string | undefined) => {
    console.log("Clicked recipe:", recipeId); // Debug: Check if click is registered
    if (recipeId && typeof onRecipeClick === "function") {
      onRecipeClick(recipeId);
    } else if (!recipeId) {
      console.error("Recipe ID is undefined");
    } else {
      console.error("onRecipeClick is not a function");
    }
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
          <ImageListItem key={recipe.idMeal} sx={{ m: 2 }}>
            <img
              src={`${recipe.strMealThumb}`}
              alt={recipe.strMeal}
              loading="lazy"
              onClick={() => handleClick(recipe.idMeal)}
              style={{ borderRadius: "2px", transition: "transform 0.4s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              } // Hover effect
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              } // Reset on leave
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
