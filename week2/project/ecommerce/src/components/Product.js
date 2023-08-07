import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <button className="details-button">
        <Link to={`/product/${product.id}`}>Details</Link>
      </button>
    </div>
  );
};

export default Products;
