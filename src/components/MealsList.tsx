import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchMeals = async () => {
  const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  return data.meals; 
};

const MealsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 2; 
  const { data, error, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading meals</p>;

  const totalMeals = data.length; 
  const totalPages = Math.ceil(totalMeals / mealsPerPage);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = data.slice(indexOfFirstMeal, indexOfLastMeal);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalVisiblePages = 7;

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(currentPage + 2, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages.map((page) => {
      if (typeof page === 'number') {
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        );
      }
      return null; 
    });
  };

  return (
    <div>
      {currentMeals.map((meal: any) => (
        <div key={`${meal.idMeal}-${meal.strMeal}`}>
          <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '200px' }} />
          <h2>{meal.strMeal}</h2>
          <p>Category: {meal.strCategory}</p>
          <p>Origin: {meal.strArea}</p>
          <Link to={`/meal/${meal.idMeal}`}>View Details</Link>
        </div>
      ))}

      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt; Previous
        </button>
        {renderPageNumbers()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default MealsList;




