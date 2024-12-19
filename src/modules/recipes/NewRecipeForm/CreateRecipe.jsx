import { useForm } from "react-hook-form";
import "./styles.css";
import { useState } from "react";
import { useRecipesDispatch } from "../RecipesProvider";
import { RECIPE_ACTIONS } from "../RecipesProvider";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { UnstyledSnackbarIntroduction } from "../../../shared-component/MuiSnackBar";

export const CreateNewRecipe = () => {
  const dispatch = useRecipesDispatch();
  const [pairCount, setPairCount] = useState(1); // Initialize pairCount state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,

    formState: { errors },
  } = useForm({
    strMeal: "",
    strCategory: "",
    ingredients: [{ ingredient: "", measure: "" }],
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

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

    setSnackbarMessage("Recipe created successfully!"); // Set Snackbar message
    setSnackbarOpen(true); // Open Snackbar

    reset();
  };

  const addIngredientPair = () => {
    setPairCount((prev) => prev + 1);
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={4}
        sx={{
          marginTop: { xs: 6, sm: 8, md: 10, lg: 15, xl: 30 },
          padding: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            marginBottom: 1,
          }}
        >
          <NoteAddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          color="secondary"
          gutterBottom
          textAlign={"center"}
        >
          Create New Recipe
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            name="strMeal"
            fullWidth
            placeholder="Enter the meal name"
            autoFocus
            sx={{ mb: 2 }}
            id="outlined-error-helper-text-strMeal"
            label="Meal name"
            autoComplete="current-strMeal"
            color="secondary"
            {...register("strMeal", {
              minLength: {
                value: 3,
                message: "Meal name should be at least 3 characters.",
              },
              required: { value: true, message: "Meal name is required." },
            })}
          />
          {errors.strMeal && (
            <FormHelperText
              sx={{
                color: "error.main",
                marginBottom: 3,
                textAlign: "center",
              }}
              error
            >
              {errors.strMeal.message}
            </FormHelperText>
          )}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="strCategory"
              {...register("strCategory")}
              value={watch("strCategory") || ""}
              onChange={(e) => setValue("strCategory", e.target.value)}
              fullWidth
              sx={{
                bgcolor: "transparent",
              }}
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-filled-label-area">
              Area
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label-area"
              id="strArea"
              {...register("strArea")}
              value={watch("strArea") || ""}
              onChange={(e) => setValue("strArea", e.target.value)}
              fullWidth
              sx={{
                bgcolor: "transparent",
              }}
            >
              <MenuItem value="">
                <em>Select an area</em>
              </MenuItem>
              {areas.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-error-helper-text-strInstructions"
            label="Instructions"
            placeholder="Enter the cooking instructions here..."
            maxRows={Infinity}
            fullWidth
            color="secondary"
            sx={{ my: 4 }}
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
            <FormHelperText
              sx={{ color: "error.main", marginBottom: 3, textAlign: "center" }}
              error
            >
              {errors.strInstructions.message}
            </FormHelperText>
          )}

          <TextField
            type="text"
            name="strDrinkAlternate"
            fullWidth
            placeholder="Enter the drink name"
            autoFocus
            sx={{ mb: 2 }}
            id="outlined-error-helper-text-strDrinkAlternate"
            label="Drink alternate name"
            autoComplete="current-strDrinkAlternate"
            color="secondary"
            {...register("strDrinkAlternate")}
          />

          <TextField
            type="text"
            name="strMealThumb"
            fullWidth
            placeholder="https://www.example.com/image.jpg"
            sx={{ mb: 2 }}
            id="outlined-error-helper-text-strMealThumb"
            label="Meal thumbnail URL"
            autoComplete="current-strMealThumb"
            color="secondary"
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
            <FormHelperText
              sx={{ color: "error.main", marginBottom: 3, textAlign: "center" }}
              error
            >
              {errors.strMealThumb.message}
            </FormHelperText>
          )}
          <TextField
            id="outlined-error-helper-text-strTags"
            label="Tags"
            fullWidth
            placeholder="Enter tags separated by commas"
            sx={{ mb: 2 }}
            {...register("strTags")}
            color="secondary"
          />

          <TextField
            type="text"
            name="strYoutube"
            fullWidth
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            sx={{ mb: 2 }}
            id="outlined-error-helper-text-strYoutube"
            label="YouTube Link"
            autoComplete="current-strYoutube"
            color="secondary"
            {...register("strYoutube")}
          />
          {errors.strYoutube && (
            <FormHelperText
              sx={{ color: "error.main", marginBottom: 3, textAlign: "center" }}
              error
            >
              {errors.strYoutube.message}
            </FormHelperText>
          )}

          <Box>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              textAlign={"center"}
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Ingredients and Measures
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign={"center"}
              sx={{ marginBottom: 2 }}
            >
              Please enter the ingredients and their respective measures below.
            </Typography>
            {[...Array(pairCount)].map((_, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <div className="ingredient-inputs">
                  <TextField
                    placeholder={`Ingredient ${index + 1}`}
                    {...register(`ingredients.${index}.ingredient`)}
                    fullWidth
                    color="secondary"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    placeholder={`Measure ${index + 1}`}
                    {...register(`ingredients.${index}.measure`)}
                    fullWidth
                    color="secondary"
                    sx={{ mb: 2 }}
                  />
                  {index > 0 && (
                    <Button
                      sx={{ marginBottom: 2, padding: 1 }}
                      type="button"
                      onClick={() => setPairCount((prev) => prev - 1)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </Stack>
            ))}
            <Button
              type="button"
              onClick={addIngredientPair}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              color="secondary"
            >
              + Ingredient
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
          >
            Create Recipe
          </Button>
          <UnstyledSnackbarIntroduction
            open={snackbarOpen}
            message={snackbarMessage}
            onClose={handleSnackbarClose}
          />
        </Box>
      </Paper>
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
