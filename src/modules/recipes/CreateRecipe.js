import React, { useState } from "react";

export const CreateNewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // add logic to handle recipe creation, e.g., Api
    console.log("Recipe Created", { recipeName, ingredients });
    // Reset form after submission
    setRecipeName("");
    setIngredients("");
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      <form>
        <div>
          <label htmlFor="recipeName"> Recipe Name</label>
          <input
            id="recipeName"
            aria-label="Create recipe search"
            placeholder="Create for recipes..."
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredints">Ingredients</label>
          <textarea
            id="ingredients"
            aria-label="Recipe name"
            value={recipeName}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="List ingredients..."
            required
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
