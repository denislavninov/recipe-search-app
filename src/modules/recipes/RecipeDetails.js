import React from "react";

export const RecipeDetails = ({ selectedRecipe, onBack }) => {
  return (
    <div className="recipe-details">
      <h2>{selectedRecipe.strMeal}</h2>
      <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
      <p>{selectedRecipe.strInstructions}</p>
      <ul>
        {Object.keys(selectedRecipe)
          .filter(
            (key) => key.startsWith("strIngredient") && selectedRecipe[key],
          )
          .map((key) => (
            <li key={key}>{selectedRecipe[key]}</li>
          ))}
      </ul>
      <button onClick={onBack}>Back to Recipe List</button>
      <p>ID: {selectedRecipe.id}</p>
    </div>
  );
};
