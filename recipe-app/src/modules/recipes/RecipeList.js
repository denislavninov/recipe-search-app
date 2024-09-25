import React from "react";

export const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.idMeal}>{recipe.strMeal}</li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};
