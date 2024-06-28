import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [video, setVideo] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/danceFinder/search', null, {
        params: {
          title,
          artist
        }
      });
      setVideo(response.data);
      fetchSearchHistory(); // 검색 후에도 검색 기록을 새로 고침
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/danceFinder/searchHistory');
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/danceFinder/delete/${id}`);
      fetchSearchHistory(); // 삭제 후에도 검색 기록을 새로 고침
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const extractVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  return (
    <div className='search-bar-container'>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input-field" />
      <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" className="input-field" />
      <button onClick={handleSearch} className="search-button">Search</button>
      {video && (
        <div className='video-result'>
          <h3>{video.title} - {video.artist}</h3>
          <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${extractVideoId(video.youtubeLink)}`} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      {searchHistory.length > 0 && (
        <div className='search-history'>
          <h2>Search History</h2>
          {searchHistory.map(record => (
            <div key={record.id} className='search-record'>
              <h3>{record.title} - {record.artist}</h3>
              <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${extractVideoId(record.youtubeLink)}`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <button onClick={() => deleteRecord(record.id)} className="delete-button">Delete</button>
              <button onClick={() => window.location.href = `/edit/${record.id}`} className="edit-button">Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

