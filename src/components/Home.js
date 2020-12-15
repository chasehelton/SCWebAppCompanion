import React, {useState, useEffect} from 'react';
import '../App.css';
import Firebase from '../lib/firebase';

export default function Home() {
  const [data, ] = useState([]);
  useEffect(() => {
    async function getData() {
      await Firebase.firestore().collection('events').get().then(
        function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            data.push(doc.data());
          });
        }
      )
    }
    getData();
  });

  //for (let i = 0; i < data.length; i++) {
    //console.log(data[i]);
  //}

  return (
    <>
      <h2>Home</h2>
    </>
  );
}