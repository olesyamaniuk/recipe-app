import React, { useState } from 'react';

interface MealSearchProps {
  onSearch: (searchTerm: string) => void;
}

const MealSearch: React.FC<MealSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter meal name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default MealSearch;

