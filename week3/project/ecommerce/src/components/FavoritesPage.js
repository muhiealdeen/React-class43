import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../FavoritesContext';
import Products from './Product';

const FavoritesPage = () => {
  const { favorites } = useFavoritesContext();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises = favorites.map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((response) =>
            response.json(),
          ),
        );

        const favoriteProducts = await Promise.all(promises);
        setFavoriteProducts(favoriteProducts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Failed to fetch favorite products.');
        console.error('Error fetching favorite products:', error);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div>
      <h1>Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : favoriteProducts.length === 0 ? (
        <p>No favorite products found.</p>
      ) : (
        <div className="product-list">
          {favoriteProducts.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      )}
      <Link to="/">Back to Products</Link>
    </div>
  );
};

export default FavoritesPage;
