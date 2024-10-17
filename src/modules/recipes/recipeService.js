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

export async function searchRecipesByName(query) {
  const data = await fetchData(`${BD_BASE_URL}/search.php?s=`, query);
  return data.meals;
}

export async function fetchCategories() {
  const data = await fetchData(`${BD_BASE_URL}/categories.php`);
  return data.categories || [];
}

export async function fetchRecipesByCategory(category) {
  const data = await fetchData(`${BD_BASE_URL}/filter.php?c=`, category); // Fetch recipes by category
  return data.meals || []; // Return an empty array if data.meals is null or undefined
}
