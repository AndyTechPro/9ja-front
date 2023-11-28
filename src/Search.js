import { useState } from 'react';

export default function SearchContainer() {
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result);
      } else {
        console.error('Search failed:', response.status);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();
      onSearch(searchTerm);
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

  return (
    <div>
      <Search onSearch={handleSearch} />
      {/* Render search results */}
      <ul>
        {searchResults.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
