import { useState, useEffect } from 'react';

const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to fetch data.');
        console.error('Error fetching data:', error);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
