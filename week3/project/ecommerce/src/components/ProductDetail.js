import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFavoritesContext } from '../FavoritesContext';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';

const ProductDetail = () => {
  const { id } = useParams();
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsFavorited(isFavorite(id));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to fetch product details.');
        console.error('Error fetching product details:', error);
      });
  }, [id, isFavorite]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
    setIsFavorited(!isFavorited);
  };

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
      <div className="heart-container" onClick={handleFavoriteClick}>
        {isFavorited ? (
          <img src={heartSolid} alt="Favorited" />
        ) : (
          <img src={heartRegular} alt="Not Favorited" />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
