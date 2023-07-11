import './App.css';

import React, { useState } from 'react';
// import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import allProducts from './fake-data/all-products';
import allCategories from './fake-data/all-categories';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) =>
        product.category.includes(selectedCategory),
      )
    : allProducts;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {allCategories.map((category, index) => (
          <li
            key={index}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
