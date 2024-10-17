import React, { useEffect, useState } from "react";
import { fetchCategories } from "../recipes/recipeService";
import { Link } from "react-router-dom";

export const Categories = () => {
  // Fetch categories from API and display them
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);
  if (loading) return <h2>Loading Categories</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>Categories</h2>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.idCategory} className="category-item">
            <Link to={`/recipes/${category.strCategory}`}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              '<h3>{category.strCategory}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
