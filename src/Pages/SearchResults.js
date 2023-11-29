import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <img src={result.cover} alt={result.title} />
            <div>
              <h3>{result.title}</h3>
              <p>{result.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
