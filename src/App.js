// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import History from './components/History';
import EditRecord from './components/EditRecord';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/history" element={<History />} />
          <Route path="/edit/:id" element={<EditRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
