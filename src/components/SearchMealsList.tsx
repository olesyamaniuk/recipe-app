import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MealSearch from './MealSearch'; 

const fetchMeals = async (searchTerm: string) => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
  return data.meals || []; 
};

const SearchMealsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  
  const { data, error, isLoading } = useQuery({
    queryKey: ['meals', searchTerm], 
    queryFn: () => fetchMeals(searchTerm), 
    enabled: searchTerm.length > 0, 
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term); 
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading meals</p>;

  return (
    <div>
      <MealSearch onSearch={handleSearch} /> 

      <div>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((meal: any) => (
            <div key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '200px' }} />
              <h2>{meal.strMeal}</h2>
              <p>Category: {meal.strCategory}</p>
              <p>Origin: {meal.strArea}</p>
              <Link to={`/meal/${meal.idMeal}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No meals found for "{searchTerm}".</p> 
        )}
      </div>
    </div>
  );
};

export default SearchMealsList;