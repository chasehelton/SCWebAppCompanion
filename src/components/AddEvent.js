import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';

export default function AddEvent({isAdding, isEditing, docId}) {
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
  }, [startDate, endDate, title, previewText, description, time, location, isEditing, isAdding])

  useEffect(() => {
    if (!isAdding) {
      Firebase.firestore()
        .collection('events')
        .doc(docId)
        .get()
        .then((event) => {
          setStartDate(event.data().startDate);
          setEndDate(event.data().endDate);
          setTitle(event.data().title);
          setDesc(event.data().description);
          setPreviewText(event.data().previewText);
          setTime(event.data().time);
          setLocation(event.data().location);
          console.log(event.data().startDate);
        })
    }
  }, [isAdding, isEditing, docId])

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
        isAdding = false;
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
        isEditing = false;
      })
      .catch(() => console.log('Something went wrong'));
  }
  return (
    <>
      {isAdding && (<h2>Adding Event</h2>)}
      {isEditing && (<h2>Editing Event</h2>)}
      <div className="eventsContainer">
        <div className="inputContainer">
          <label htmlFor="eventTitle">Title: </label>
          <input type="text" id="eventTitle" name="Title" onChange={handleTitleChange} value={title}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventDescription">Description: </label>
          <textarea id="eventDescription" name="Description" cols="60" rows="5" onChange={handleDescChange} value={description}></textarea>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventPreviewText">Preview: </label>
          <textarea id="eventPreviewText" name="Preview" cols="60" rows="5" onChange={handlePreviewChange} value={previewText}></textarea>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventStartDate">Start Date: </label>
          <input type="date" id="eventStartDate" name="Start Date" onChange={handleStartDateChange} value={startDate}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventEndDate">End Date: </label>
          <input type="date" id="eventEndDate" name="End Date" onChange={handleEndDateChange} value={endDate}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventTime">Time: </label>
          <input type="time" id="eventTime" name="Time" onChange={handleTimeChange} value={time}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="eventAddress">Location: </label>
          <input type="text" id="eventAddress" name="Address" onChange={handleLocationChange} value={location} />
        </div>
      </div>
      {readyToSubmit && (
        <>
          {isEditing && (
            <button className="submitButton" onClick={() => editData(event)}>Submit</button>
          )}
          {!isEditing && (
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
