import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

const RecipeFilter: React.FC = () => {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategories(data.categories);
    };

    const fetchRecipes = async () => {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecipes(data.meals);
    };

    fetchCategories();
    fetchRecipes();
  }, []);

  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.strCategory === selectedCategory)
    : recipes;

  return (
    <div>
      <h1>Фільтр рецептів по категорії</h1>
      <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">Виберіть категорію</option>
        {categories.map(category => (
          <option key={category.idCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>

      <h2>Рецепти</h2>
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100px' }} />
            <h3>{recipe.strMeal}</h3>
            <Link to={`/meal/${recipe.idMeal}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeFilter;

