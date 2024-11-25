import { useForm } from "react-hook-form";
import { Container } from "../../../shared-component/Container";
import "./styles.css";
import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";

export const CreateNewRecipe = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    strMeal: "",
    strCategory: "Beef",
  });

  const onSubmit = (data) => {
    const formattedData = {
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strDrinkAlternate: data.strDrinkAlternate || "",
      strArea: data.strArea || "",
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealThumb || "",
      strTags: data.strTags ? data.strTags.split(",") : [],
      ingredients: [data.strIngredients1 || ""],
    };
    setRecipes([...recipes, formattedData]);
    console.log("New recipe added", formattedData);
  };

  return (
    <Container>
      <h2>Create New Recipe</h2>
      <form className="newRecipe-form " onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="strMeal">Meal name</label>
        <input
          id="strMeal"
          {...register("strMeal", {
            minLength: {
              value: 3,
              message: "Meal name should be at least 3 characters.",
            },
            required: { value: true, message: "Meal name is required." },
          })}
        />
        {errors.strMeal && <p>{errors.strMeal.message}</p>}

        <label htmlFor="strCategory">Select Category</label>
        <select id="strCategory" {...register("strCategory")}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="strDrinkAlternate">Drink Alternate</label>
        <input id="strDrinkAlternate" {...register("strDrinkAlternate")} />

        <label htmlFor="strArea">Select Area</label>
        <select id="strArea" {...register("strArea", { required: true })}>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {errors.strArea && <p>{errors.strArea.message}</p>}

        <label htmlFor="strInstructions"> Instructions</label>
        <textarea
          id="strInstructions"
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
        {errors.strInstructions && <p>{errors.strInstructions.message}</p>}

        <label htmlFor="strMealThumb">Meal thumbnail URL </label>
        <input
          id="strMealThumb"
          {...register("strMealThumb", {
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
              message: "Please enter a valid URL",
            },
            required: { value: true, message: "URL is required" },
          })}
        />
        {errors.strMealThumb && <p>Meal thumbnail is required.</p>}

        <label htmlFor="strTags">Tags</label>
        <input id="strTags" {...register("strTags")} />

        <label htmlFor="strYoutube">YouTube Link</label>
        <input id="strYoutube" {...register("strYoutube")} />

        <label htmlFor="strIngredient1">Ingredient 1</label>
        <input id="strIngredient1" {...register("strIngredient1")} />

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
