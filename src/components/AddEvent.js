import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';

export default function AddEvent({isAdding, isEditting, docId}) {
  const [startDate, setStartDate] = useState("");
  const handleStartDateChange = ev => setStartDate(ev.target.value);
  const [endDate, setEndDate] = useState("");
  const handleEndDateChange = ev => setEndDate(ev.target.value);
  const [title, setTitle] = useState("");
  const handleTitleChange = ev => setTitle(ev.target.value);
  const [description, setDesc] = useState("");
  const handleDescChange = ev => setDesc(ev.target.value);
  const [previewText, setPreviewText] = useState("");
  const handlePreviewChange = ev => setPreviewText(ev.target.value);
  const [time, setTime] = useState("");
  const handleTimeChange = ev => setTime(ev.target.value);
  const [location, setLocation] = useState("");
  const handleLocationChange = ev => setLocation(ev.target.value);

  const [readyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    if (startDate && endDate && title && previewText && description && time && location) setIsReadyToSubmit(true);
    else setIsReadyToSubmit(false);
  }, [startDate, endDate, title, previewText, description, time, location])

  useEffect(() => {
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);
    if (date1.getTime() - date2.getTime() > 0) {
      setIsReadyToSubmit(false);
      alert('End date cannot be before start date');
    }
  }, [startDate, endDate])

  const event = {
    startDate,
    endDate,
    title,
    previewText,
    description,
    time,
    location,
  }

  const sendData = event => {
    Firebase.firestore()
      .collection('events')
      .add(event)
      .then(() => {
        alert('Sent!');
        isAdding = true;
      })
      .catch(() => console.log('Something went wrong'));
  }

  const editData = event => {
    Firebase.firestore()
      .collection('events')
      .doc(docId)
      .update(event)
      .then(() => {
        alert('Sent!');
        isAdding = true;
      })
      .catch(() => console.log('Something went wrong'));
  }
  return (
    <>
      {isAdding && (<h2>Adding Event</h2>)}
      {isEditting && (<h2>Editting Event</h2>)}
      <div className="eventsContainer">
        <div className="inputContainer">
          <label htmlFor="eventTitle">Title: </label>
          <input type="text" id="eventTitle" name="Title" onChange={handleTitleChange} />
        </div>
        <div className="inputContainer">
          <label htmlFor="eventDescription">Description: </label>
          <textarea id="eventDescription" name="Description" cols="60" rows="5" onChange={handleDescChange}></textarea>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventPreviewText">Preview: </label>
          <textarea id="eventPreviewText" name="Preview" cols="60" rows="5" onChange={handlePreviewChange}></textarea>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventStartDate">Start Date: </label>
          <input type="date" id="eventStartDate" name="Start Date" onChange={handleStartDateChange} />
        </div>
        <div className="inputContainer">
          <label htmlFor="eventEndDate">End Date: </label>
          <input type="date" id="eventEndDate" name="End Date" onChange={handleEndDateChange} />
        </div>
        <div className="inputContainer">
          <label htmlFor="eventTime">Time: </label>
          <input type="time" id="eventTime" name="Time" onChange={handleTimeChange} />
        </div>
        <div className="inputContainer">
          <label htmlFor="eventAddress">Location: </label>
          <input type="text" id="eventAddress" name="Address" onChange={handleLocationChange} />
        </div>
      </div>
      {readyToSubmit && (
        <>
          {isEditting && (
            <button className="submitButton" onClick={() => editData(event)}>Submit</button>
          )}
          {!isEditting && (
            <button className="submitButton" onClick={() => sendData(event)}>Submit</button>
          )}
        </>
      )}
      {!readyToSubmit && (
        <button className="submitButton" onClick={() => alert('Please fill in all fields.')}>Submit</button>
      )}
    </>
  );
}