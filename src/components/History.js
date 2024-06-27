// src/components/History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './History.css';

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
    </div>
  );
};

export default History;


// // History.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function History() {
//   const [history, setHistory] = useState([]);
//   const [editItem, setEditItem] = useState(null);
//   const [newTitle, setNewTitle] = useState('');
//   const [newArtist, setNewArtist] = useState('');

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/history');
//         setHistory(response.data);
//       } catch (error) {
//         console.error('Error fetching history:', error);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/history/${id}`);
//       setHistory(history.filter(item => item.id !== id));
//     } catch (error) {
//       console.error('Error deleting history item:', error);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     setNewTitle(item.title);
//     setNewArtist(item.artist);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:8080/history/${editItem.id}`, {
//         title: newTitle,
//         artist: newArtist
//       });
//       setHistory(history.map(item => 
//         item.id === editItem.id ? { ...item, title: newTitle, artist: newArtist } : item
//       ));
//       setEditItem(null);
//       setNewTitle('');
//       setNewArtist('');
//     } catch (error) {
//       console.error('Error updating history item:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Search History</h2>
//       <ul>
//         {history.map((item) => (
//           <li key={item.id}>
//             {editItem && editItem.id === item.id ? (
//               <div>
//                 <input 
//                   type="text" 
//                   value={newTitle} 
//                   onChange={(e) => setNewTitle(e.target.value)} 
//                   placeholder="Song Title"
//                 />
//                 <input 
//                   type="text" 
//                   value={newArtist} 
//                   onChange={(e) => setNewArtist(e.target.value)} 
//                   placeholder="Artist Name"
//                 />
//                 <button onClick={handleUpdate}>Update</button>
//                 <button onClick={() => setEditItem(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 <span>{item.title} - {item.artist}</span>
//                 <button onClick={() => handleEdit(item)}>Edit</button>
//                 <button onClick={() => handleDelete(item.id)}>Delete</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default History;
