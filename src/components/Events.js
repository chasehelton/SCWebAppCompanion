import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';
import AddEvent from '../components/AddEvent';

export default function Events() {
  const [data, setData] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [docId, setDocId] = useState('');
  useEffect(() => {
    async function getEvents() {
      await Firebase.firestore().collection('events').get()
        .then(querySnapshot => {
          let tempData = [];
          querySnapshot.forEach(doc => {
            let title = doc.data().title;
            let description = doc.data().description;
            let startDate = doc.data().startDate;
            let endDate = doc.data().endDate;
            let previewText = doc.data().previewText;
            let location = doc.data().location;
            let time = doc.data().time;
            let type = 'event';
            let id = doc.id;

            let event = {
              id,
              type,
              title,
              description,
              startDate,
              endDate,
              previewText,
              location,
              time,
            }
            tempData.push(event);
          });
          setData(tempData);
          setIsResolved(true);
        }
      )
    }
    getEvents();
  }, [isAdding]);

  return (
    <>
      {!isAdding && !isEditting && (
        <>
          <div className="addButtonContainer">
            <button onClick={() => setIsAdding(true)}>+ Add Event</button>
          </div>
          {!isResolved && <h1>Loading...</h1>}
          {isResolved && <table>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Preview Text</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Time</th>
            </tr>
            {data.map(ele => {
              return (
                <>
                  <tr>
                    <td><button className="editButton" onClick={() => {
                      setIsEditting(true);
                      setDocId(ele.id);
                      console.log(ele.id);
                    }}>Edit</button></td>
                    <td>{ele.title}</td>
                    <td>{ele.description}</td>
                    <td>{ele.previewText}</td>
                    <td>{ele.location}</td>
                    <td>{ele.startDate}</td>
                    <td>{ele.endDate}</td>
                    <td>{ele.time}</td>
                    <br />
                  </tr>
                </>)
            })}
          </table>}
        </>
      )}
      {isAdding && (
        <>
          <AddEvent isAdding={isAdding}/>
          <button className="closeButton" onClick={() => setIsAdding(false)}>Close</button>
        </>
      )}
      {isEditting && (
        <>
          <AddEvent isEditting={isAdding} docId={docId} />
          <button className="closeButton" onClick={() => setIsEditting(false)}>Close</button>
        </>
      )}
    </>
  );
}