import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Implement your search logic here
    // For demonstration, let's assume you have a search endpoint on the server

    try {
      const response = await fetch(`https://ninejaback.onrender.com/search?term=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error('Search request failed');
      }
    } catch (error) {
      console.error('Error during search:', error);
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

        {/* Display search results */}
        <div>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>{result.title}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
