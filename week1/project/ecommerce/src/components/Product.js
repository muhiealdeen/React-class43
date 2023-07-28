// ProductList.js
import React from 'react';
import '../App.css';

const Product = ({ product }) => {
  return (
    <li key={product.id} className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
    </li>
  );
};

export default Product;
