import React from 'react';
import '../App.css';

export default function Table(props) {
  return (
    <table>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Description</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Preview Text</th>
        <th>Location</th>
        <th>Time</th>
      </tr>
      {props.data.map(ele => {
        return <tr>
          <button className="editButton" onClick={() => {console.log('Clicked!')}}>Edit</button>
          <td>{ele.title}</td>
          <td>{ele.description}</td>
          <td>{ele.startDate}</td>
          <td>{ele.endDate}</td>
          <td>{ele.previewText}</td>
          <td>{ele.location}</td>
          <td>{ele.time}</td>
          <br />
        </tr>
      })}
    </table>
  )
}