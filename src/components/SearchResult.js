// SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

function SearchResults() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <h3>{result.title} - {result.artist}</h3>
            <YouTube videoId={result.videoId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;

