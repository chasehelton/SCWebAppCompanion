import React, {useState} from 'react';
import '../App.css';
import Events from '../components/Events';
import Firebase from '../lib/firebase';

export default function Manager() {
  const [currentPage, setCurrentPage] = useState('E');

  const handleSignout = () => {
    let ans = window.confirm("Are you sure you want to sign out?")
    if (ans) {
      Firebase.auth().signOut();
      console.log('Logged out');
    }
  }
  return (
    <div className="mainContainer">
      <h1>Summit College App Management</h1>
      <div className="tabContainer">
        <button onClick={() => setCurrentPage('E')}>Events</button>
        <button onClick={() => setCurrentPage('A')}>Announcements</button>
        <button onClick={() => setCurrentPage('N')}>Notifications</button>
        <button onClick={() => setCurrentPage('S')}>Scripture</button>
        <button onClick={() => setCurrentPage('P')}>Podcasts</button>
        <button className="signOutButton" onClick={() => handleSignout()}>Sign Out</button>
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