import React from "react";

export const RecipeList = ({ recipes, onRecipeClick }) => {
  console.log("Recipes:", recipes); // Debug: Check if recipes are being passed correctly
  console.log("onRecipeClick:", onRecipeClick); // Debug: Check if onRecipeClick is a function

  const handleClick = (recipeId) => {
    console.log("Clicked recipe:", recipeId); // Debug: Check if click is registered
    if (typeof onRecipeClick === "function") {
      onRecipeClick(recipeId);
    } else {
      console.error("onRecipeClick is not a function");
    }
  };

  return (
    <div className="recipe-list">
      {Array.isArray(recipes) && recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li
              className="recipe-item"
              key={recipe.idMeal}
              onClick={() => handleClick(recipe.idMeal)}
            >
              {recipe.strMeal}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};
