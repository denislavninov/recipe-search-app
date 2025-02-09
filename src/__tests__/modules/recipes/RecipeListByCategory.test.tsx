import { render, screen } from "@testing-library/react";
import { RecipeListByCategory } from "../../../modules/recipes/RecipeListByCategory";

global.fetch = jest.fn();

describe("<RecipeListByCategory, component/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading message initially", () => {
    render(<RecipeListByCategory />);
    expect(screen.getByText(/Loading Recipes.../i)).toBeInTheDocument();
  });

  it("should display recipe list when data is loaded", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ recipes: [] }),
    });

    render(<RecipeListByCategory />);
    expect(await screen.queryByText(/No recipes found/i)).toBeNull();
  });

  it("should display error message when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Error: "));

    render(<RecipeListByCategory />);
    expect(await screen.findByText(/Error: /i)).toBeInTheDocument();
  });

  it("should display error message when fetch fails with specific message", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    render(<RecipeListByCategory />);
    expect(await screen.findByText(/Error: Network Error/i)).toBeInTheDocument();
  });

  it("should display a list of recipes when data is successfully fetched", async () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Recipe One" },
      { idMeal: "2", strMeal: "Recipe Two" },
      { idMeal: "3", strMeal: "Recipe Three" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ meals: mockRecipes }),
    });

    render(<RecipeListByCategory />);

    // Wait for the recipes to appear using getByTestId
    expect(await screen.findByTestId("recipe-1")).toBeInTheDocument();
    expect(await screen.findByTestId("recipe-2")).toBeInTheDocument();
    expect(await screen.findByTestId("recipe-3")).toBeInTheDocument();
  });
});
