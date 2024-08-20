import React, { useState } from 'react';
import FileDrop from './FileDrop';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <button onClick={() => handleCategoryClick('Staff')}>Staff</button>
      <button onClick={() => handleCategoryClick('Material')}>Material</button>
      <button onClick={() => handleCategoryClick('Location')}>Location</button>
      <button onClick={() => handleCategoryClick('Job-Material')}>Job-Material</button>
      <button onClick={() => handleCategoryClick('Job-Activity')}>Job-Activity</button>
      <button onClick={() => handleCategoryClick('Job')}>Job</button>
      <button onClick={() => handleCategoryClick('DB-Note')}>DB-Note</button>
      <button onClick={() => handleCategoryClick('Company')}>Company</button>
      

      {/* Conditionally render the FileDrop component if a category is selected */}

      {selectedCategory && (
        <div>
          <h2>Upload files for {selectedCategory}</h2>
          <FileDrop />
        </div>
      )}
    </div>
  );
};

export default Categories;
