import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealsList from './components/MealsList.tsx';
import MealDetail from './components/MealDetail.tsx';
// import SelectedRecipes from './components/SelectedRecipes';
import FavoriteMeals from './components/FavoriteMeals.tsx';
import SearchMealsList from './components/SearchMealsList.tsx';
import RecipeFilter from './components/RecipeFilter.tsx';
import NavBar from './components/NavBar.tsx'; 

const App: React.FC = () => {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<MealsList />} />
        <Route path="/meal/:id" element={<MealDetail />} />
        <Route path="/selected-recipes" element={<FavoriteMeals />} />
        <Route path="/search" element={<SearchMealsList />} />
        <Route path="/filter" element={<RecipeFilter />} />
      </Routes>
    </Router>
  );
};

export default App;
