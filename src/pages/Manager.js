import React, {useState} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';

import Events from '../components/Events';


export default function Manager() {
  const [currentPage, setCurrentPage] = useState('H');

  const handleSignout = () => {
    let ans = window.confirm("Are you sure you want to sign out?")
    if (ans) {
      Firebase.auth().signOut();
      console.log('Logged out');
    }
  }
  return (
    <div className="mainContainer">
      <div className="tabContainer">
        <button onClick={() => setCurrentPage('E')}>Events</button>
        <button onClick={() => setCurrentPage('A')}>Announcements</button>
        <button onClick={() => setCurrentPage('S')}>Scripture</button>
        <button className="signOutButton" onClick={() => handleSignout()}>Sign Out</button>
      </div>
      {currentPage === 'E' && (
        <Events />
      )}
      {currentPage === 'A' && (
        <p>Announcements</p>
      )}
      {currentPage === 'S' && (
        <p>Scripture</p>
      )}
    </div>
  );
}