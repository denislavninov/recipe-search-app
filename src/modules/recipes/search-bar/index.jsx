import { useState } from "react";
import { searchRecipesByName } from "../recipeService";
import { useRecipesDispatch, RECIPE_ACTIONS } from "../RecipesProvider";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useRecipesDispatch();

  function handleChange(e) {
    setQuery(e.target.value.trim());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const recipes = await searchRecipesByName(query);
    dispatch({ type: RECIPE_ACTIONS.update, payload: recipes });
    console.log(recipes);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 10,
        paddingTop: 10,
      }}
    >
      <TextField
        onChange={handleChange}
        value={query}
        aria-label="Recipe search"
        placeholder="Search for recipes..."
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                type="submit"
                variant="text"
                color="primary"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </InputAdornment>
          ),
          sx: {
            borderRadius: "10", // Dairevi kenarları kaldır
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1", // Kenar çizgilerini kaldır
            },
            borderRadius: "10",

            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "1", // Hover durumunda kenar çizgilerini kaldır
            },
            borderRadius: "10",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none", // Focus durumunda kenar çizgilerini kaldır
            },
            "& .MuiInputBase-root": {
              borderBottom: "2px solid", // Sadece alt kenarı belirgin hale getir
              borderColor: "primary.main", // Alt kenarın rengini ayarla
            },
          },
        }}
      />
    </Box>
  );
};
