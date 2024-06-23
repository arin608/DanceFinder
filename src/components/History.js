// History.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/history/${id}`);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setNewTitle(item.title);
    setNewArtist(item.artist);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/history/${editItem.id}`, {
        title: newTitle,
        artist: newArtist
      });
      setHistory(history.map(item => 
        item.id === editItem.id ? { ...item, title: newTitle, artist: newArtist } : item
      ));
      setEditItem(null);
      setNewTitle('');
      setNewArtist('');
    } catch (error) {
      console.error('Error updating history item:', error);
    }
  };

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {editItem && editItem.id === item.id ? (
              <div>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="Song Title"
                />
                <input 
                  type="text" 
                  value={newArtist} 
                  onChange={(e) => setNewArtist(e.target.value)} 
                  placeholder="Artist Name"
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditItem(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{item.title} - {item.artist}</span>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
