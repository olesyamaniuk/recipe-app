// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchMealById = async (id: string) => {
//   const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//   return data.meals[0];
// };

// const addToFavorites = (meal: any) => {
//   const savedMeals = JSON.parse(localStorage.getItem('favorites') || '[]');
//   const updatedMeals = [...savedMeals, meal];
//   localStorage.setItem('favorites', JSON.stringify(updatedMeals));
//   alert(`${meal.strMeal} has been added to favorites!`);
// };

// const MealDetail: React.FC = () => {
//   const { id } = useParams();
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['mealDetail', id],
//     queryFn: () => fetchMealById(id as string),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading meal</p>;

//   return (
//     <div>
//       <img src={data.strMealThumb} alt={data.strMeal} style={{ width: '300px' }} />
//       <h1>{data.strMeal}</h1>
//       <p>Category: {data.strCategory}</p>
//       <p>Origin: {data.strArea}</p>
//       <h3>Instructions:</h3>
//       <p>{data.strInstructions}</p>
//       <h3>Ingredients:</h3>
//       <ul>
//         {Array.from({ length: 20 }, (_, i) => i + 1)
//           .map(i => data[`strIngredient${i}`])
//           .filter(ing => ing)
//           .map(ing => <li key={ing}>{ing}</li>)}
//       </ul>

//       {/* Кнопка для додавання в обране */}
//       <button onClick={() => addToFavorites(data)}>
//         Add to Favorites
//       </button>
//     </div>
//   );
// };

// export default MealDetail;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMealById = async (id: string) => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return data.meals[0];
};

const addToFavorites = (meal: any) => {
  const savedMeals = JSON.parse(localStorage.getItem('favorites') || '[]');

  const isAlreadyFavorite = savedMeals.some((savedMeal: any) => savedMeal.idMeal === meal.idMeal);
  if (isAlreadyFavorite) {
    alert(`${meal.strMeal} is already in favorites!`);
    return; 
  }

  const updatedMeals = [...savedMeals, meal];
  localStorage.setItem('favorites', JSON.stringify(updatedMeals));
  alert(`${meal.strMeal} has been added to favorites!`);
};

const MealDetail: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['mealDetail', id],
    queryFn: () => fetchMealById(id as string),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading meal</p>;

  return (
    <div>
      <img src={data.strMealThumb} alt={data.strMeal} style={{ width: '300px' }} />
      <h1>{data.strMeal}</h1>
      <p>Category: {data.strCategory}</p>
      <p>Origin: {data.strArea}</p>
      <h3>Instructions:</h3>
      <p>{data.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map(i => data[`strIngredient${i}`])
          .filter(ing => ing)
          .map((ing, index) => <li key={`${ing}-${index}`}>{ing}</li>)}
      </ul>

      {/* Button to add to favorites */}
      <button onClick={() => addToFavorites(data)}>
        Add to Favorites
      </button>
    </div>
  );
};

export default MealDetail;

