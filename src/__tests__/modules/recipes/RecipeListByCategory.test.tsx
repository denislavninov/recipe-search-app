
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

});
