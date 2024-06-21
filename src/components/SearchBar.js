import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/search', {
        params: { query }
      });
      navigate('/results', { state: { results: response.data } });
    }
    catch (error) {
      console.error('Error searching Yuotube:', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for a song...'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}