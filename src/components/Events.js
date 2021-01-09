import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';
import AddEditEvent from '../components/AddEditEvent';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Events() {
  const [data, setData] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [docId, setDocId] = useState('');
  useEffect(() => {
    async function getEvents() {
      await Firebase.firestore().collection('events').get()
        .then(querySnapshot => {
          let tempData = [];
          querySnapshot.forEach((doc) => {
            let title = doc.data().title;
            let description = doc.data().description;
            let startDate = doc.data().startDate;
            let endDate = doc.data().endDate;
            let previewText = doc.data().previewText;
            let location = doc.data().location;
            let time = doc.data().time;
            time = convertTime(time);
            let type = 'event';
            let id = doc.id;

            // Event object
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

          // Sort the data by start date
          tempData.sort((a, b) => {
            a = new Date(a.startDate).getTime();
            b = new Date(b.startDate).getTime();
            return a - b;
          })
          
          // Set the data state to the new data pulled in from Firebase
          setData(tempData);

          // Get rid of the Loading... notifications
          setIsResolved(true);
        }
      )
    }
    getEvents();
  }, [isAdding, isEditing]);

  const convertTime = time => {
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var timeValue;
    if (hours > 0 && hours <= 12) timeValue= "" + hours;
    else if (hours > 12) timeValue= "" + (hours - 12);
    else if (hours === 0) timeValue= "12";
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " P.M." : " A.M.";
    return timeValue;
  }

  const deleteEvent = id => {
    Firebase.firestore()
      .collection('events')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Deleted event');
      })
  }

  return (
    <>
      {!isAdding && !isEditing && (
        <>
          <div className="addButtonContainer">
            <button onClick={() => setIsAdding(true)}>+ Add Event</button>
          </div>
          {!isResolved && <h1>Loading...</h1>}
          {isResolved && <table><tbody>
            <tr className="tableHeader">
              <th></th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Title</th>
              <th>Description</th>
              <th>Preview</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
            {data.map((ele, i) => {
              return (
                <>
                  {i % 2 === 0 && (
                  <tr className="grayRow">
                    <div className="crudButtons">
                      <button className="editButtonInverted" onClick={() => {
                        setIsEditing(true);
                        setDocId(ele.id);
                      }}>
                        <IconButton aria-label="edit">
                          <EditIcon fontSize="medium" />
                        </IconButton>
                      </button>
                      <button className="deleteButtonInverted" onClick={() => {
                        var r = window.confirm("Are you sure you want to delete this event?");
                        if (r === true) deleteEvent(ele.id);
                      }}>
                        <IconButton aria-label="delete">
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </button>
                    </div>
                    <td>{ele.startDate}</td>
                    <td>{ele.endDate}</td>
                    <td>{ele.title}</td>
                    <td>{ele.description}</td>
                    <td>{ele.previewText}</td>
                    <td>{ele.location}</td>
                    <td>{ele.time}</td>
                  </tr>)}
                  {i % 2 === 1 && (
                  <tr className="whiteRow">
                    <div className="crudButtons">
                      <button className="editButton" onClick={() => {
                        setIsEditing(true);
                        setDocId(ele.id);
                      }}>
                        <IconButton aria-label="edit">
                          <EditIcon fontSize="medium" />
                        </IconButton>
                      </button>
                      <button className="deleteButton" onClick={() => {
                        var r = window.confirm("Are you sure you want to delete this event?");
                        if (r === true) deleteEvent(ele.id);
                      }}>
                        <IconButton aria-label="delete">
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </button>
                    </div>
                    <td>{ele.startDate}</td>
                    <td>{ele.endDate}</td>
                    <td>{ele.title}</td>
                    <td>{ele.description}</td>
                    <td>{ele.previewText}</td>
                    <td>{ele.location}</td>
                    <td>{ele.time}</td>
                  </tr>)}
                </>)
            })}
          </tbody></table>}
        </>
      )}
      {isAdding && (
        <>
          <AddEditEvent isAdding={isAdding}/>
          <button className="closeButton" onClick={() => setIsAdding(false)}>Close</button>
        </>
      )}
      {isEditing && (
        <>
          <AddEditEvent isEditing={isEditing} docId={docId} />
          <button className="closeButton" onClick={() => setIsEditing(false)}>Close</button>
        </>
      )}
    </>
  );
}