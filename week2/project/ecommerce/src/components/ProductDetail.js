import React, { useState, useEffect } from 'react';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <div>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
