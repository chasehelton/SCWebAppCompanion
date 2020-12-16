import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';
import Table from '../components/Table';

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getEvents() {
      await Firebase.firestore().collection('events').get().then(
        function(querySnapshot) {
          let tempData = [];
          querySnapshot.forEach(function(doc) {
            let title = doc.data().title;
            let description = doc.data().description;
            let startDate = doc.data().startDate;
            let endDate = doc.data().endDate;
            let previewText = doc.data().previewText;
            let location = doc.data().location;
            let time = doc.data().time;
            let type = 'event';

            let event = {
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
        }
      )
    }
    getEvents();
  }, []);

  return (
    <>
      <h2>Home</h2>
      <Table data={data} />
    </>
  );
}