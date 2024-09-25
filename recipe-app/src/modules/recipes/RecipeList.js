import React from "react";

export const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li className="recipe-item" key={recipe.idMeal}>
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
