// Search.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchResults from './Pages/SearchResults'; 

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://ninejaback.onrender.com/search?term=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        history.push('/Pages/SearchResults'); // Navigate to the search results page
      } else {
        console.error('Search request failed:', response.status);
        setSearchError('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setSearchError('Failed to fetch search results');
    }
  };

  return (
    <div className="search_text">
      <h3>Search for what to download here</h3>
      <div className="search-body">
        <form onSubmit={handleSearch} className="search_form" role="search" method="POST">
          <input
            type="text"
            aria-label="search"
            id="searchinput"
            name="searchTerm"
            placeholder="Search here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {/* Display search results or error */}
      {searchError ? (
        <p>{searchError}</p>
      ) : (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
};

export default Search;
