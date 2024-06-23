// Home.js - YouTube API 요청 수정
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const searchQuery = `${title} ${artist} dance`; // 'dance' 키워드 추가
      const response = await axios.post('http://localhost:8080/youtube/search', { query: searchQuery });
      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  return (
    <div>
      <h1>Search for Dance Videos</h1>
      <form onSubmit={handleSubmit}>
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
          placeholder="Artist" 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Home;
