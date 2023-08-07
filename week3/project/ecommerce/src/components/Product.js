import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../FavoritesContext';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';

const Products = ({ product }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesContext();
  const isFavorited = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <button className="favorite-button" onClick={handleFavoriteClick}>
        {isFavorited ? (
          <img src={heartSolid} alt="Favorited" />
        ) : (
          <img src={heartRegular} alt="Not Favorited" />
        )}
      </button>
      <Link to={`/product/${product.id}`}>Details</Link>
    </div>
  );
};

export default Products;
