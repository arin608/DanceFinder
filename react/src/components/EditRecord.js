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

// 깃 테스트
