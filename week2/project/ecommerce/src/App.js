import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Product from './components/Product';
import CategoryFilter from './components/CategoryFilter';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

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
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let apiUrl = 'https://fakestoreapi.com/products';
    if (category !== 'all') {
      apiUrl = `https://fakestoreapi.com/products/category/${category}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div>
        <h1>Products</h1>
        <CategoryFilter
          categories={categories}
          activeCategory={category}
          onCategoryChange={handleCategoryChange}
        />
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
