import { useForm } from "react-hook-form";
import { Container } from "../../../shared-component/Container";
import "./styles.css";
import { useState } from "react";
import { useRecipesDispatch } from "../RecipesProvider";
import { RECIPE_ACTIONS } from "../RecipesProvider";

export const CreateNewRecipe = () => {
  const dispatch = useRecipesDispatch();
  const [pairCount, setPairCount] = useState(1); // Initialize pairCount state

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    strMeal: "",
    strCategory: "",
    ingredients: [{ ingredient: "", measure: "" }],
  });

  const onSubmit = (data) => {
    const formattedData = {
      idMeal: Date.now(),
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strDrinkAlternate: data.strDrinkAlternate || "",
      strArea: data.strArea || "",
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealThumb || "",
      strTags: data.strTags ? data.strTags.split(",") : [],
      strYoutube: data.strYoutube || "",
      ingredients: [data.strIngredients1 || ""],
      ...data.ingredients
        .filter((pair) => pair.ingredient.trim() !== "")
        .reduce(
          (acc, pair, index) => ({
            ...acc,
            [`strIngredient${index + 1}`]: pair.ingredient,
            [`strMeasure${index + 1}`]: pair.measure,
          }),
          {},
        ),
    };
    dispatch({ type: RECIPE_ACTIONS.update, payload: [formattedData] }); // Use dispatch to add the recipe
    console.log("New recipe added", formattedData);
  };

  const addIngredientPair = () => {
    setPairCount((prev) => prev + 1);
  };
  return (
    <Container>
      <h2>Create New Recipe</h2>
      <form
        className="newRecipe-form "
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="strMeal">Meal name</label>
        <input
          id="strMeal"
          placeholder="Enter the meal name"
          {...register("strMeal", {
            minLength: {
              value: 3,
              message: "Meal name should be at least 3 characters.",
            },
            required: { value: true, message: "Meal name is required." },
          })}
        />
        {errors.strMeal && (
          <p className="error-message">{errors.strMeal.message}</p>
        )}

        <select id="strCategory" {...register("strCategory")}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select id="strArea" {...register("strArea", { required: true })}>
          <option>Select an area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {errors.strArea && (
          <p className="error-message">{errors.strArea.message}</p>
        )}

        <label htmlFor="strInstructions"> Instructions</label>
        <textarea
          id="strInstructions"
          placeholder="Enter the cooking instructions here..."
          {...register("strInstructions", {
            minLength: {
              value: 30,
              message: "Instruction must be at least 30 characters.",
            },
            maxLength: {
              value: 1000,
              message: "Instruction must be maximum 1000 characters.",
            },
            required: { value: true, message: "Instructions is required." },
          })}
        />
        {errors.strInstructions && (
          <p className="error-message">{errors.strInstructions.message}</p>
        )}
        <label htmlFor="strDrinkAlternate">Drink Alternate</label>
        <input
          id="strDrinkAlternate"
          placeholder="Enter alternate drink name"
          {...register("strDrinkAlternate")}
        />

        <label htmlFor="strMealThumb">Meal thumbnail URL </label>
        <input
          id="strMealThumb"
          placeholder="https://www.example.com/image.jpg"
          {...register("strMealThumb", {
            pattern: {
              value:
                /^(https?:\/\/)([a-z0-9-]+\.)+[a-z]{2,}([\/\w .-]*)*\/?(\?.*)?$/,
              message: "Please enter a valid URL",
            },
            required: { value: true, message: "URL is required" },
          })}
        />
        {errors.strMealThumb && (
          <p className="error-message">{errors.strMealThumb.message}</p>
        )}
        <label htmlFor="strTags">Tags</label>
        <input
          id="strTags"
          placeholder="Enter tags separated by commas"
          {...register("strTags")}
        />

        <label htmlFor="strYoutube">YouTube Link</label>
        <input id="strYoutube" {...register("strYoutube")} />
        {errors.strYouTube && (
          <p className="error-message">{errors.strYouTube.message}</p>
        )}

        <div className="ingredients-section">
          <h3>Ingredients and Measures</h3>
          {[...Array(pairCount)].map((_, index) => (
            <div key={index} className="ingredient-pair">
              <div className="ingredient-inputs">
                <input
                  placeholder={`Ingredient ${index + 1}`}
                  {...register(`ingredients.${index}.ingredient`)}
                />
                <input
                  placeholder={`Measure ${index + 1}`}
                  {...register(`ingredients.${index}.measure`)}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => setPairCount((prev) => prev - 1)}
                    className="remove-ingredient"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientPair}
            className="add-ingredient"
          >
            + Ingredient
          </button>
        </div>
        <button type="submit" className="submit-button">
          Create Recipe
        </button>
      </form>
    </Container>
  );
};

const categories = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
];

const areas = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "Filipino",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Tunisian",
  "Turkish",
  "Ukrainian",
  "Unknown",
  "Vietnamese",
];
