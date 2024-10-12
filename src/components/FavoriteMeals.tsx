import React from 'react';

import { Link } from 'react-router-dom';

const FavoriteMeals: React.FC = () => {
  const savedMeals = JSON.parse(localStorage.getItem('favorites') || '[]');

  const removeFromFavorites = (mealId: string) => {
    const updatedMeals = savedMeals.filter((meal: any) => meal.idMeal !== mealId);
    localStorage.setItem('favorites', JSON.stringify(updatedMeals));
    window.location.reload(); 
  };

  const allIngredients = savedMeals.reduce((acc: string[], meal: any) => {
    const ingredients = Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
      .filter(ing => ing);
    return [...acc, ...ingredients];
  }, []);

  return (
    <div>
      <h1>Favorite Meals</h1>
      <div className="meals-grid">
        {savedMeals.map((meal: any) => (
          <div className="meal-card" key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%' }} />
            <h2>{meal.strMeal}</h2>
            <p>Category: {meal.strCategory}</p>
            <p>Origin: {meal.strArea}</p>
            <Link to={`/meal/${meal.idMeal}`}>View Details</Link>
            <button onClick={() => removeFromFavorites(meal.idMeal)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>

      <h2>Ingredients from all meals:</h2>
      <ul>
        {Array.from(new Set(allIngredients)).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteMeals;

