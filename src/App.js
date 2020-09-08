import React, {useState} from 'react';
import './App.css';

import Events from './components/Events';

export default function App() {
  const [currentPage, setCurrentPage] = useState('E');
  return (
    <div className="mainContainer">
      <h1>Summit College App Management</h1>
      <div className="tabContainer">
        <button onClick={() => setCurrentPage('E')}>Events</button>
        <button onClick={() => setCurrentPage('A')}>Announcements</button>
        <button onClick={() => setCurrentPage('N')}>Notifications</button>
        <button onClick={() => setCurrentPage('S')}>Scripture</button>
        <button onClick={() => setCurrentPage('P')}>Podcasts</button>
      </div>
      {currentPage === 'E' && (
        <Events />
      )}
      {currentPage === 'A' && (
        <p>Announcements</p>
      )}
      {currentPage === 'N' && (
        <p>Notifications</p>
      )}
      {currentPage === 'S' && (
        <p>Scripture</p>
      )}
      {currentPage === 'P' && (
        <p>Podcasts</p>
      )}
    </div>
  );
}
