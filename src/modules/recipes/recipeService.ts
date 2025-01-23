import { fetchData } from "../../utils";

export const BD_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipesByIngredient(query: string) {
  const data = await fetchData(`${BD_BASE_URL}/filter.php?i=${query}`);
  return data.meals || [];
}

export async function fetchRecipesById(idMeal: string) {
  const data = await fetchData(`${BD_BASE_URL}/lookup.php?i=${idMeal}`);
  return data.meals[0];
}

export async function searchRecipesByName(query: string) {
  const data = await fetchData(`${BD_BASE_URL}/search.php?s=`, query);
  return data.meals;
}

export async function fetchCategories() {
  const data = await fetchData(`${BD_BASE_URL}/categories.php`);
  return data.categories || [];
}

export async function fetchRecipesByCategory(category: string ) {
  const data = await fetchData(`${BD_BASE_URL}/filter.php?c=${category}`);
  return data.meals || [];
}
