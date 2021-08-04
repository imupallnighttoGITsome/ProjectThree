import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import { useHistory } from 'react-router-dom'


const EventUpdateForm = ({match, pastEvent}) => {
    const history = useHistory()
    const [event, setEvent] = useState([]);

    console.log(pastEvent)
    const [updateForm, setUpdateForm] = useState([]);
    console.log(event);

useEffect(() => {
    const id = match.params.id;
    const url = `http://localhost:4000/event/${id}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setEvent(data);
        setUpdateForm(data)
        console.log("data has been received");
      })
      .catch(() => {
        console.log("error retreiving data");
      });
  }, []);


console.log(updateForm);
const [date, setDate] = useState(new Date())
const handleChange = (event) => {
    setUpdateForm({ ...updateForm, [event.target.id]: event.target.value })
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updateForm)
    const id = match.params.id
    console.log(id)
    const url = `http://localhost:4000/event/edit/${id}`
    axios.put(url, {...updateForm, dateAndTime:date})
    .then(res => {
        console.log(res.data)
        // setUpdateForm(preLoadedValues)            
        history.push(`/event/${res.data._id}`)
        })
        .catch(err => console.log(err.data))
    };



    return (
        <div>
            <h1>Update Event</h1>
            <div className="form">
                <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="name">Event Name:</label>
                <input type="text" id="name" onChange={handleChange} value={updateForm.name}/>
                    <label htmlFor="name">Host:</label>
                    <input type="text" id="user" onChange={handleChange} value={updateForm.user}/>
                    <label htmlFor="type">Type:</label>
                    <select type="text" id="type" onChange={handleChange} value={updateForm.type}>
                            <option value="Sports and Fitness">Sports and Fitness</option>
                            <option value="Games">Games</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Health_Wellbeing">Health & WellBeing</option>
                            <option value="Hobbies">Hobbies</option>
                            <option value="Social_Gathering">Social Gathering</option>
                    </select>
                    <label htmlFor="location">Location:</label>
                    <select type="text" id="location" onChange={handleChange} value={updateForm.location}>
                            <option value="Orlando">Orlando</option>
                            <option value="Dallas">Dallas</option>
                            <option value="KansasCity">Kansas City</option>
                            <option value="Chicago">Chicago</option> 
                    </select> 
                    <label htmlFor="datetime">Date/Time:</label>
                    <DateTimePicker onChange={setDate} value={date} required />
                
                    <label htmlFor="online">Online:</label>
                    <input type="checkbox" id="online" placeholder="" onChange={handleChange} value="Online"/>
                    <label htmlFor="inPerson">In Person:</label>
                    <input type="checkbox" id="inPerson" placeholder="" onChange={handleChange} value="In Person"/>
                    <label htmlFor="socialComfortScale">Sociability Scale:</label>
                    <input type="checkbox" id="socialComfortScale" placeholder="" onChange={handleChange} value="one emoji"/>
                    <input type="checkbox" id="socialComfortScale" placeholder="" onChange={handleChange} value="5 emoji"/>
                    <label htmlFor="details">Description:</label>
                    <textarea type="text" id="details" cols="30" rows="10" placeholder="click here to type message" onChange={handleChange} value={updateForm.details}></textarea>
                    <button type="submit">Update EVENT</button>
                </form>
                

            </div>
        </div>
        
    )}
                        


export default EventUpdateForm