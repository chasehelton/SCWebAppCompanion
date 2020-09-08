import React, {useState} from 'react';
import './App.css';
import Firebase from './lib/firebase';

import Manager from './pages/Manager';
import Login from './pages/Login';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  Firebase.auth().onAuthStateChanged((user) => {
    if (user.email === 'scappadmin@summitrdu.com') {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
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
