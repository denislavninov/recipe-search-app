import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "./recipeService";
import { Category } from "./models/Category";

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <h2>Loading Categories...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      <h2>Categories</h2>
      <Grid container spacing={6}>
        {categories.map((category) => (
          <Grid item xs={12} sm={3} md={2} key={category.idCategory}>
            <Card
              onClick={() =>
                navigate(`/recipes/categories/${category.strCategory}`)
              }
            >
              <CardMedia
                component="img"
                height="200"
                image={category.strCategoryThumb}
                alt={category.strCategory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                sx={{
                  transition: "transform 0.4s",
                  cursor: "pointer",
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {category.strCategory}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
