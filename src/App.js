import React, {useState, useEffect} from 'react';
import './App.css';
import Firebase from './lib/firebase';

import Manager from './pages/Manager';
import Login from './pages/Login';

export default function App() {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {

  }, [currentUser]);
  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.email === 'scappadmin@summitrdu.com') {
        setCurrentUser(true);
      }
    } else {
      setCurrentUser(false);
    }
  })

  return (
    <>
      {currentUser && (
        <Manager />
      )}
      {!currentUser && (
        <Login />
      )}
    </>
  );
}
