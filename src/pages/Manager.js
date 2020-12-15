import React, {useState} from 'react';
import '../App.css';
import Events from '../components/Events';
import Crud from '../components/Home';
import Firebase from '../lib/firebase';

export default function Manager() {
  const [currentPage, setCurrentPage] = useState('E');
  const [showAdd, setShowAdd] = useState(false);

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
        <button onClick={() => setCurrentPage('H')}>Home</button>
        {!showAdd && (<button onClick={() => setShowAdd(true)}>Add</button>)}
        {showAdd && (
          <div>
            <button onClick={() => setCurrentPage('E')}>Events</button>
            <button onClick={() => setCurrentPage('A')}>Announcements</button>
            <button onClick={() => setCurrentPage('S')}>Scripture</button>
            <button onClick={() => setShowAdd(false)}>Close</button>
          </div>
        )}
        <button className="signOutButton" onClick={() => handleSignout()}>Sign Out</button>
      </div>
      {currentPage === 'H' && (
        <Crud />
      )}
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