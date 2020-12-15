import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const handleEmailChange = ev => setEmail(ev.target.value);
  const [password, setPassword] = useState('');
  const handlePasswordChange = ev => setPassword(ev.target.value);

  const [readyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    if (email && password) setIsReadyToSubmit(true);
    else setIsReadyToSubmit(false);
  }, [email, password])

  const handleSubmit = (email, password) => {
    Firebase.auth().signInWithEmailAndPassword(email, password);
  }

  return(
    <div className="loginContainer">
      <h1>Admin Login</h1>
      <div className="inputContainer">
        <h3>Username: </h3>
        <input type="text" id="username" name="Title" onChange={handleEmailChange} />
      </div>
      <div className="inputContainer">
        <h3>Password: </h3>
        <input type="password" id="password" name="Title" onChange={handlePasswordChange} />
      </div>
      {readyToSubmit && (
        <button className="submitButton" onClick={() => handleSubmit(email, password)}>Submit</button>
      )}
      {!readyToSubmit && (
        <button className="submitButton" onClick={() => alert('Please fill in all fields.')}>Submit</button>
      )}
    </div>
  );
}