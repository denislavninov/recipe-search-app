export interface NewRecipeFormData {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strDrinkAlternate: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  ingredients: { ingredient: string; measure: string }[];
}
