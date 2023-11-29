import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?term=${encodeURIComponent(searchTerm)}`);
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
    </div>
  );
};

export default Search;
