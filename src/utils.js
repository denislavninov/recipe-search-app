export const BD_SEARCH_BASE_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export async function fetchData(url, query = "") {
  const response = await fetch(`${url}${query}`);
  if (!response.ok) {
    throw Error(`An error occured when fetching data from ${url}.`);
  }
  return await response.json();
}

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
