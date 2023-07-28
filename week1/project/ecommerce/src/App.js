import './App.css';

import React, { useState } from 'react';
import allProducts from './fake-data/all-products';
import allCategories from './fake-data/all-categories';
import Product from './components/Product';
import CategoryFilter from './components/CategoryFilter';

const App = () => {
  const [category, setCategory] = useState('all');

  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) {
      setCategory('all');
    } else {
      setCategory(newCategory);
    }
  };

  const filteredProducts =
    category === 'all'
      ? allProducts
      : allProducts.filter(
          (product) => `FAKE: ${product.category}` === category,
        );
  // console.log('66666?????????????', filteredProducts);
  // // console.log('3333333????????????????', product.category)
  // console.log('888888888888????', category);
  return (
    <div>
      <h1>Products</h1>
      <CategoryFilter
        categories={[...allCategories, 'all']}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default App;
