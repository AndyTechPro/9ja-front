import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('term');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://ninejaback.onrender.com'; 

    const fetchSearchResults = async () => {
      try {
        const url = `${apiUrl}/search?term=${term}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
        <ul className="post2">
          {searchResults.map((result) => (
            <li key={result._id}>
              <Link to={`/post/${result._id}`}>
                <img className="image2" src={result.cover} alt={result.title} style={{ width: '100px', height: '100px' }} />
                <div className="texts2">{result.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;

