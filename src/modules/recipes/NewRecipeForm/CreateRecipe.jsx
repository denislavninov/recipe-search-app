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
<<<<<<< HEAD
    strCategory: "Beef",
=======
    strCategory: "",
>>>>>>> 3c54945 (added lesson40 some styles and changes)
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
<<<<<<< HEAD
=======
          placeholder="Enter the meal name"
>>>>>>> 3c54945 (added lesson40 some styles and changes)
          {...register("strMeal", {
            minLength: {
              value: 3,
              message: "Meal name should be at least 3 characters.",
            },
            required: { value: true, message: "Meal name is required." },
          })}
        />
<<<<<<< HEAD
        {errors.strMeal && <p>{errors.strMeal.message}</p>}

        <label htmlFor="strCategory">Select Category</label>
        <select id="strCategory" {...register("strCategory")}>
=======
        {errors.strMeal && (
          <p className="error-message">{errors.strMeal.message}</p>
        )}

        <select id="strCategory" {...register("strCategory")}>
          <option value="">Select a category</option>
>>>>>>> 3c54945 (added lesson40 some styles and changes)
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

<<<<<<< HEAD
        <label htmlFor="strDrinkAlternate">Drink Alternate</label>
        <input id="strDrinkAlternate" {...register("strDrinkAlternate")} />

        <label htmlFor="strArea">Select Area</label>
        <select id="strArea" {...register("strArea", { required: true })}>
=======
        <select id="strArea" {...register("strArea", { required: true })}>
          <option>Select an area</option>
>>>>>>> 3c54945 (added lesson40 some styles and changes)
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
<<<<<<< HEAD
        {errors.strArea && <p>{errors.strArea.message}</p>}
=======
        {errors.strArea && (
          <p className="error-message">{errors.strArea.message}</p>
        )}
>>>>>>> 3c54945 (added lesson40 some styles and changes)

        <label htmlFor="strInstructions"> Instructions</label>
        <textarea
          id="strInstructions"
<<<<<<< HEAD
=======
          placeholder="Enter the cooking instructions here..."
>>>>>>> 3c54945 (added lesson40 some styles and changes)
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
<<<<<<< HEAD
        {errors.strInstructions && <p>{errors.strInstructions.message}</p>}
=======
        {errors.strInstructions && (
          <p className="error-message">{errors.strInstructions.message}</p>
        )}
        <label htmlFor="strDrinkAlternate">Drink Alternate</label>
        <input
          id="strDrinkAlternate"
          placeholder="Enter alternate drink name"
          {...register("strDrinkAlternate")}
        />
>>>>>>> 3c54945 (added lesson40 some styles and changes)

        <label htmlFor="strMealThumb">Meal thumbnail URL </label>
        <input
          id="strMealThumb"
<<<<<<< HEAD
          {...register("strMealThumb", {
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
=======
          placeholder="https://www.example.com/image.jpg"
          {...register("strMealThumb", {
            pattern: {
              value:
                /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
>>>>>>> 3c54945 (added lesson40 some styles and changes)
              message: "Please enter a valid URL",
            },
            required: { value: true, message: "URL is required" },
          })}
        />
<<<<<<< HEAD
        {errors.strMealThumb && <p>Meal thumbnail is required.</p>}

        <label htmlFor="strTags">Tags</label>
        <input id="strTags" {...register("strTags")} />

        <label htmlFor="strYoutube">YouTube Link</label>
        <input id="strYoutube" {...register("strYoutube")} />

        <label htmlFor="strIngredient1">Ingredient 1</label>
        <input id="strIngredient1" {...register("strIngredient1")} />

=======
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

        <label htmlFor="strIngredient1">Ingredient 1</label>
        <input
          id="strIngredient1"
          placeholder="Enter the first ingredient"
          {...register("strIngredient1")}
        />
        <label htmlFor="strIngredient1">Ingredient 2</label>
        <input
          id="strIngredient1"
          placeholder="Enter the second ingredient" // Placeholder eklendi
          {...register("strIngredient1")}
        />
>>>>>>> 3c54945 (added lesson40 some styles and changes)
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
