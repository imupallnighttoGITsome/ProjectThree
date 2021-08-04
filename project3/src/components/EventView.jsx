import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventView =  (props) => {
console.log(props);
//console.log(user)
const [event, setEvent] = useState([]);
  useEffect(() => {
    const id = props.match.params.id;
    const url = `http://localhost:4000/event/${id}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setEvent(data);
        console.log("data has been received");
      })
      .catch(() => {
        console.log("error retreiving data");
      });
  }, []);

  function deleteEvent() {
    const id = props.match.params.id;
    const url = `http://localhost:4000/event/${id}`;
    axios.delete(url);
  }
  console.log(event);
  return (
    <div>
      <h2>Event:{event.name}</h2>
      <h2>Host:{event.addedBy}</h2>
      <h2>Type:{event.type}</h2>
      <h3>City:{event.city}</h3>
      <h3>Event Date:{event.date}</h3>
      <h3>{event.online}</h3>
      <h3>{event.inPerson}</h3>
      <h3>Cost:{event.cost}</h3>
      <p>Event Details:{event.details}</p>

      <Link to={"/event/edit/" + event._id}> UPDATE</Link>
      <Link to={"/events"} onClick={deleteEvent}>
        DELETE
      </Link>
    </div>
  );
};

export default EventView;
