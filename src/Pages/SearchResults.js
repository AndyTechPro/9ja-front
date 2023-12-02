import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('term');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/search?term=${term}`);
        console.log('Response:', response); // Log the response content
        const data = await response.json();

        setSearchResults(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Error during search:', error);
        setLoading(false);
      }
    };

    if (term) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [term]);

  if (!term) {
    return <div>No search term provided</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Search Results for "{term}"</h2>
      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              <img src={result.cover} alt={result.title} style={{ width: '100px', height: '100px' }} />
              <div>{result.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
