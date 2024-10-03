import { fetchData } from "../../utils";

export const BD_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipesByIngredient(query) {
  const data = await fetchData(`${BD_BASE_URL}/filter.php?i=`, query);
  return data.meals || []; // Return an empty array if data.meals is null or undefined
}

export async function fetchRecipesById(idMeal) {
  const data = await fetchData(`${BD_BASE_URL}/lookup.php?i=`, idMeal);
  return data.meals[0];
}

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

export async function searchRecipesByName(query) {
  const data = await fetchData(`${BD_BASE_URL}/search.php?s=`, query);
  return data.meals;
}
