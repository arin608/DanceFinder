// src/components/EditRecord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRecord.css';

const EditRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState({ title: '', artist: '', youtubeLink: '' });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/danceFinder/searchHistory');
        const foundRecord = response.data.find(rec => rec.id === parseInt(id));
        if (foundRecord) {
          setRecord(foundRecord);
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/danceFinder/update/${id}`, null, {
        params: {
          title: record.title,
          artist: record.artist
        }
      });
      navigate('/history');
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  return (
    <div className='edit-record-container'>
      <h2>Edit Record</h2>
      <input
        type="text"
        name="title"
        value={record.title}
        onChange={handleChange}
        placeholder="Title"
        className="input-field"
      />
      <input
        type="text"
        name="artist"
        value={record.artist}
        onChange={handleChange}
        placeholder="Artist"
        className="input-field"
      />
      <button onClick={handleUpdate} className="update-button">Update</button>
    </div>
  );
};

export default EditRecord;


// // SearchResults.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchResult = ({ record, onUpdate }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [title, setTitle] = useState(record.title);
//     const [artist, setArtist] = useState(record.artist);

//     const handleUpdate = async () => {
//         try {
//             const response = await axios.put(`http://localhost:8080/api/danceFinder/update/${record.id}`, null, {
//                 params: { title, artist }
//             });
//             onUpdate(response.data);
//             setIsEditing(false);
//         } catch (error) {
//             console.error('Error updating record:', error);
//         }
//     };

//     return (
//         <div>
//             {isEditing ? (
//                 <div>
//                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//                     <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
//                     <button onClick={handleUpdate}>Save</button>
//                     <button onClick={() => setIsEditing(false)}>Cancel</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h3>{record.title} - {record.artist}</h3>
//                     <iframe
//                         width="560"
//                         height="315"
//                         src={`https://www.youtube.com/embed/${record.youtubeLink.split('=')[1]}`}
//                         frameBorder="0"
//                         allowFullScreen
//                         title={record.title}
//                     ></iframe>
//                     <button onClick={() => setIsEditing(true)}>Edit</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SearchResult;


