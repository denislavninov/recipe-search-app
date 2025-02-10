import { render, screen, waitFor } from "@testing-library/react";
import { RecipeListByCategory } from "../../../modules/recipes/RecipeListByCategory";
import { fetchRecipesByCategory } from "../../../modules/recipes/recipeService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";

jest.mock("../../../modules/recipes/recipeService", () => ({
  fetchRecipesByCategory: jest.fn(),
}));

const renderWithRouter = (children: ReactNode) => {
  render(
    <MemoryRouter initialEntries={["/recipes/categories/test-category"]}>
      <Routes>
        <Route path="/recipes/categories/:categoryId" element={children}/>
      </Routes>
    </MemoryRouter>,
  );
};

describe("<RecipeListByCategory />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading message initially", () => {
    renderWithRouter(<RecipeListByCategory />);
    expect(screen.getByText(/Loading Recipes.../i)).toBeInTheDocument();
  });

  it("should display recipe list when data is loaded", async () => {
    (fetchRecipesByCategory as jest.Mock).mockResolvedValue([]);

    renderWithRouter(<RecipeListByCategory />);
    expect(screen.queryByText(/No recipes found/i)).toBeNull();
  });

  it("should display error message when fetch fails", async () => {
    (fetchRecipesByCategory as jest.Mock).mockRejectedValueOnce(
      new Error("An error occured when fetching data from"),
    );

    renderWithRouter(<RecipeListByCategory />);

    expect(await screen.findByText(/An error occured when fetching data from/i)).toBeInTheDocument();
  });

  it("should display error message when fetch fails with specific message", async () => {
    (fetchRecipesByCategory as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error"),
    );

    renderWithRouter(<RecipeListByCategory />);

    expect(
      await screen.findByText(/Error: Network Error/i),
    ).toBeInTheDocument();
  });

  it("should display a list of recipes when data is successfully fetched", async () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Recipe One" },
      { idMeal: "2", strMeal: "Recipe Two" },
      { idMeal: "3", strMeal: "Recipe Three" },
    ];

    (fetchRecipesByCategory as jest.Mock).mockResolvedValueOnce(mockRecipes);

    renderWithRouter(<RecipeListByCategory />);

    await waitFor(() =>
      expect(fetchRecipesByCategory).toHaveBeenCalledTimes(1),
    );

    expect(await screen.findByTestId("recipe-1")).toBeInTheDocument();
    expect(await screen.findByTestId("recipe-2")).toBeInTheDocument();
    expect(await screen.findByTestId("recipe-3")).toBeInTheDocument();
  });
});
