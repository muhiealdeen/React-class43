import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to fetch product details.');
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error-msg">Error: {error}</p>;
  }

  if (!product) {
    return <p className="no-product">Product not found.</p>;
  }

  return (
    <div className="detail-container">
      <h2>{product.title}</h2>
      <div className="image-detail">
        <img src={product.image} alt={product.title} />
      </div>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetail;
