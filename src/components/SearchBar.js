// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/search`, { // 에러 나는 중
        "title=" :+ title,
        "artist=" :+ artist
      });
      console.log('Search result:', response.data);
      navigate('/results', { state: { results: response.data } });
    } 
    catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist Name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
