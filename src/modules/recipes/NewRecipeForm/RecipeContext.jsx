import React, { createContext, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
<<<<<<< HEAD
=======

export default RecipeProvider;
>>>>>>> 3c54945 (added lesson40 some styles and changes)
