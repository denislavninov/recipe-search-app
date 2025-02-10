import { RecipeList } from "../../../modules/recipes/RecipeList";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import * as RecipesProvider from "../../../modules/recipes/RecipesProvider"; // Import the entire module
import * as recipeService from "../../../modules/recipes/recipeService";
const mockRecipes = [
  { idMeal: '1', strMeal: 'Chicken Curry', strMealThumb: 'http://example.com/chicken-curry.jpg', strInstructions: 'Chicken Curry Instructions' },
  { idMeal: '2', strMeal: 'Beef Stew', strMealThumb: 'http://example.com/beef-stew.jpg', strInstructions: 'Beef Stew Instructions' },
];

jest.mock("../../../modules/recipes/RecipesProvider", () => ({
  ...jest.requireActual("../../../modules/recipes/RecipesProvider"),
  useRecipes: jest.fn(),
})); // Mock the entire module and the specific hook

const renderRecipeList = () => {
  return render(
    <MemoryRouter>
      <RecipeList />
    </MemoryRouter>
  );
};

describe("<RecipeList /> component", () => {
  beforeEach(() => {
    jest.spyOn(RecipesProvider, 'useRecipes').mockReturnValue(mockRecipes); // Mock the hook
  });

  it("should render correctly", () => {
    renderRecipeList();
  });

  it("should display recipes when they are loaded", () => {
    renderRecipeList();

    expect(screen.getByText(/Chicken Curry/i)).toBeInTheDocument();
    expect(screen.getByText(/Beef Stew/i)).toBeInTheDocument();
  });

  it("should make an API request if there are no recipes", () => {
    jest.spyOn(RecipesProvider, 'useRecipes').mockReturnValue([]); // Mock the hook to simulate no recipes
    jest.spyOn(recipeService, 'fetchRecipesByIngredient').mockResolvedValue([]);
    renderRecipeList();

    expect(recipeService.fetchRecipesByIngredient).toHaveBeenCalledWith("chicken");
  });



});
