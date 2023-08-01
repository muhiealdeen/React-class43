import React from 'react';
import '../App.css';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          style={{
            fontWeight: category === activeCategory ? 'bold' : 'normal',
          }}
        >
          {category}
          {/* console.log(category); */}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
