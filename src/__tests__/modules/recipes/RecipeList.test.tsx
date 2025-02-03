import { RecipeList } from "../../../modules/recipes/RecipeList";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { RecipesProvider } from "../../../modules/recipes/RecipesProvider";

describe("<RecipeList /> component", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <RecipeList />
      </MemoryRouter>
    )
  })

  it("should display recipes when they are loaded", () => {
    const mockRecipes = [
      { idMeal: '1', strMeal: 'Chicken Curry', strMealThumb: 'http://example.com/chicken-curry.jpg', strInstructions: 'Chicken Curry Instructions' },
      { idMeal: '2', strMeal: 'Beef Stew', strMealThumb: 'http://example.com/beef-stew.jpg', strInstructions: 'Beef Stew Instructions' },
    ];

    render(
      <MemoryRouter>
        <RecipesProvider initialState={mockRecipes}>
          <RecipeList />
        </RecipesProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/chicken curry/i)).toBeInTheDocument();
    expect(screen.getByText(/beef stew/i)).toBeInTheDocument();
  });

});

