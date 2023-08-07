import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CategoryFilter from './components/CategoryFilter';
import Products from './components/Product';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(['all', ...data]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to fetch categories.');
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    const endpoint =
      category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to fetch products.');
        console.error('Error fetching products:', error);
      });
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <Router>
      <div className="app-content">
        <h1>Products</h1>
        <div className="category-buttons">
          {categories.map((category) => (
            <CategoryFilter
              key={category}
              category={category}
              activeCategory={category}
              handleCategoryChange={handleCategoryChange}
            />
          ))}
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <div className="product-list">
                    {products.map((product) => (
                      <Products key={product.id} product={product} />
                    ))}
                  </div>
                )
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
