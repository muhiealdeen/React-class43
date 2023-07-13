// App.js
import './App.css';

import React, { useState } from 'react';
import allProducts from './fake-data/all-products';

const App = () => {
  const [category, setCategory] = useState('all');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const filteredProducts =
    category === 'all'
      ? allProducts
      : allProducts.filter((product) => product.category === category);

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => handleCategoryChange('all')}>All</button>
      <button onClick={() => handleCategoryChange("men's clothing")}>
        Men's Clothing
      </button>
      <button onClick={() => handleCategoryChange("women's clothing")}>
        Women's Clothing
      </button>
      <button onClick={() => handleCategoryChange('jewelery')}>Jewelry</button>
      <button onClick={() => handleCategoryChange('electronics')}>
        Electronics
      </button>

      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
