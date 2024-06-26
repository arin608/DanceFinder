import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import History from './components/History';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/results" element={<SearchResult />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import SearchResult from './SearchResult';

// const App = () => {
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchHistory, setSearchHistory] = useState([]);

//     useEffect(() => {
//         // 초기 로드 시 검색 기록 가져오기
//         fetchSearchHistory();
//     }, []);

//     const fetchSearchHistory = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/danceFinder/searchHistory');
//             setSearchHistory(response.data);
//         } catch (error) {
//             console.error('Error fetching search history:', error);
//         }
//     };

//     const handleSearch = (result) => {
//         setSearchResults([result]);
//         fetchSearchHistory();
//     };

//     const handleUpdate = (updatedRecord) => {
//         // 업데이트된 기록을 반영하여 상태 업데이트
//         const updatedHistory = searchHistory.map(record =>
//             record.id === updatedRecord.id ? updatedRecord : record
//         );
//         setSearchHistory(updatedHistory);
//     };

//     return (
//         <div>
//             <SearchBar onSearch={handleSearch} />
//             <h2>Search Results</h2>
//             {searchResults.map(result => (
//                 <SearchResult key={result.id} record={result} onUpdate={handleUpdate} />
//             ))}
//             <h2>Search History</h2>
//             {searchHistory.map(record => (
//                 <SearchResult key={record.id} record={record} onUpdate={handleUpdate} />
//             ))}
//         </div>
//     );
// };

// export default App;
