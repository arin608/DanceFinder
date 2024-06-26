import React, { useState } from 'react';
import axios from 'axios';

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
      console.log('Search successful:', response.data);
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
      fetchSearchHistory(); // Refresh history after delete
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
      <button onClick={handleSearch}>Search</button>
      {video && (
        <div>
          <h3>{video.title}</h3>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.videoId}`} frameBorder="0" allowFullScreen></iframe>
        </div>
      )}
      <button onClick={fetchSearchHistory}>View Search History</button>
      {searchHistory.length > 0 && (
        <div>
          <h2>Search History</h2>
          {searchHistory.map(record => (
            <div key={record.id}>
              <h3>{record.title} - {record.artist}</h3>
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${record.youtubeLink}`} frameBorder="0" allowFullScreen></iframe>
              <button onClick={() => deleteRecord(record.id)}>Delete</button>
              {/* Add an edit button here if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

