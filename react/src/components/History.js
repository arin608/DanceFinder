import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './History.css'

const History = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchHistory();
  }, []);

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
    <div className='history-container'>
      <h2>Search History</h2>
      {searchHistory.map(record => (
        <div key={record.id} className='history-record'>
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
          <button onClick={() => navigate(`/edit/${record.id}`)} className="edit-button">Edit</button>
        </div>
      ))}

      <button onClick={() => navigate('/')} className='back-button'>Back</button>
    </div>
  );
};

export default History;

