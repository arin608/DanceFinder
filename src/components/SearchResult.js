// SearchResults.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchResult = ({ record, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(record.title);
    const [artist, setArtist] = useState(record.artist);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/danceFinder/update/${record.id}`, null, {
                params: { title, artist }
            });
            onUpdate(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{record.title} - {record.artist}</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${record.youtubeLink.split('=')[1]}`}
                        frameBorder="0"
                        allowFullScreen
                        title={record.title}
                    ></iframe>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default SearchResult;


