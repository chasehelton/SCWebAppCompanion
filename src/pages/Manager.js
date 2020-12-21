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
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
      <div className="mainContainer">
        <div className="navBar">
          <div className="dataSelectButtons">
            <div className="navButton"><button onClick={() => setCurrentPage('E')}>Events</button></div>
            <div className="navButton"><button onClick={() => setCurrentPage('A')}>Announcements</button></div>
            <div className="navButton"><button onClick={() => setCurrentPage('S')}>Scripture</button></div>
          </div>
          <div className="settingsButtons">
            <button className="signOutButton" onClick={() => handleSignout()}>Sign Out</button>
          </div>
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
    </>
  );
}