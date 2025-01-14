export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory?: string; // Example additional property
  strArea?: string; // Example additional property
  strTags?: string; // Example additional property
  strYoutube?: string; // Example additional property
  strIngredient1?: string; // Example additional property
  strIngredient2?: string; // Example additional property
  // Add all other properties from the API response here
  [key: string]: any; // For other dynamic properties like ingredients
} 