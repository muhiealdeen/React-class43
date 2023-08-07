import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CategoryFilter from './components/CategoryFilter';
import Products from './components/Product';
import ProductDetail from './components/ProductDetail';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';
import useFetch from './hooks/useFetch';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('all');
  const {
    data: products,
    loading,
    error,
  } = useFetch(
    category === 'all'
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${category}`,
    [category],
  );

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(['all', ...data]);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <Router>
      <div className="app-content">
        <Navbar />
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
        </div>
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
          <Route path="/favourites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
