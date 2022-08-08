import { useState, useEffect } from 'react'
import noteService from './services/db'
import moment from 'moment'
var momentDurationFormatSetup = require("moment-duration-format")

const Journeys = (props) => {
  if (props.month === 1) {
    return (
      <>
        <h4>Filter by station's departure or return name: </h4> <input value={props.showFiltered} onChange={props.handleFilterChange}/>
        <h4>Here there are:</h4>
        <table>
          <tbody>
            {props.journeysMay.filter(station => station["Departure station name"].toLowerCase()
              .includes(props.showFiltered.toLowerCase()))
              .map((value, id) => (
                <tr key={id.toString()}>
                  <td><b>Departure: </b>{value["Departure station name"]}</td><td><b>Return: </b>{value["Return station name"]}</td><td><b>Duration: </b>{moment.duration(value["Duration (sec)"], "seconds").format("mm:ss")} min</td><td><b>Distance: </b>{value["Covered distance (m)"] / 1000} km</td>
                </tr>
              ))
            }
            {props.journeysMay.filter(station => station["Return station name"].toLowerCase()
              .includes(props.showFiltered.toLowerCase()))
              .map((value, id) => (
                <tr key={id.toString()}>
                  <td><b>Departure: </b>{value["Departure station name"]}</td><td><b>Return: </b>{value["Return station name"]}</td><td><b>Duration: </b>{moment.duration(value["Duration (sec)"], "seconds").format("mm:ss")} min</td><td><b>Distance: </b>{value["Covered distance (m)"] / 1000} km</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    )
  } else if (props.month === 2) {
    return (
      <>
        <h4>Filter by station's departure or return name: </h4> <input value={props.showFiltered} onChange={props.handleFilterChange}/>
        <h4>Here there are:</h4>
        <table>
          <tbody>
            {props.journeysJune.filter(station => station["Departure station name"].toLowerCase()
              .includes(props.showFiltered.toLowerCase()))
              .map((value, id) => (
                <tr key={id.toString()}>
                  <td><b>Departure: </b> {value["Departure station name"]}</td><td><b>Return: </b>{value["Return station name"]}</td><td><b>Duration: </b> {moment.duration(value["Duration (sec)"], "seconds").format("mm:ss")} min</td><td><b>Distance: </b> {value["Covered distance (m)"] / 1000} km</td>
                </tr>
              ))
            }
            {props.journeysJune.filter(station => station["Return station name"].toLowerCase()
              .includes(props.showFiltered.toLowerCase()))
              .map((value, id) => (
                <tr key={id.toString()}>
                  <td><b>Departure: </b> {value["Departure station name"]}</td><td><b>Return: </b>{value["Return station name"]}</td><td><b>Duration: </b> {moment.duration(value["Duration (sec)"], "seconds").format("mm:ss")} min</td><td><b>Distance: </b> {value["Covered distance (m)"] / 1000} km</td>
                </tr>
              ))
            }  
          </tbody>
        </table>
      </>
    )
  } else if (props.month === 3) {
    return (
      <>
        <h4>Filter by station's departure or return name:</h4> <input value={props.showFiltered} onChange={props.handleFilterChange}/>
        <h4>Here there are:</h4>
        <table>
          <tbody>
            {props.journeysJuly.filter(station => station["Departure station name"].toLowerCase()
              .includes(props.showFiltered.toLowerCase()))
              .map((value, id) => (
                <tr key={id.toString()}>
                  <td><b>Departure: </b>{value["Departure station name"]}</td><td><b>Return: </b>{value["Return station name"]}</td><td><b>Duration: </b>{moment.duration(value["Duration (sec)"], "seconds").format("mm:ss")} min</td><td><b>Distance: </b>{value["Covered distance (m)"] / 1000} km</td>
                </tr>
              ))
            }
            {props.journeysJuly.filter(station => station["Return station name"].toLowerCase()
              .includes(props.showFiltered.toLowerCase()))
              .map((value, id) => (
                <tr key={id.toString()}>
                  <td><b>Departure: </b>{value["Departure station name"]}</td><td><b>Return: </b>{value["Return station name"]}</td><td><b>Duration: </b>{moment.duration(value["Duration (sec)"], "seconds").format("mm:ss")} min</td><td><b>Distance: </b>{value["Covered distance (m)"] / 1000} km</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    )
  }
}

const Stations = (props) => {
  if (props.value > 0) {
  return (
    <>
      {props.stations.map((value, id) => (
        <li key={id.toString()}>
          {value["Name"]}
        </li>
      ))}
    </>
  )
}}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const [journeysMay, setJourneysMay] = useState([])
  const [journeysJune, setJourneysJune] = useState([])
  const [journeysJuly, setJourneysJuly] = useState([])
  const [stations, setStations] = useState([])
  const [value, setValue] = useState(0)
  const [month, setValueMonth] = useState(0)
  const [showFiltered, setShowFiltered] = useState('')
  var count_stations = 0
  var count_may = 1
  var count_june = 2
  var count_july = 3

  useEffect(() => {
    noteService
      .getMay()
      .then(initialNotes => {
        setJourneysMay(initialNotes)
      })
  }, [])

  useEffect(() => {
    noteService
      .getJune()
      .then(initialNotes => {
        setJourneysJune(initialNotes)
      })
  }, [])

  useEffect(() => {
    noteService
      .getJuly()
      .then(initialNotes => {
        setJourneysJuly(initialNotes)
      })
  }, [])

  useEffect(() => {
    noteService
      .getStations()
      .then(initialNotes => {
        setStations(initialNotes)
      })
  }, [])

  const stations_vote = () => {
    count_stations +=1
    setValue(count_stations)
  }

  const hide_stations_vote = () => {
    setValue(0)
  }

  const may_vote = () => { 
    setValueMonth(count_may)
  }

  const june_vote = () => {
    setValueMonth(count_june)
  }

  const july_vote = () => {
    setValueMonth(count_july)
  }

  const hide_journeys_vote = () => {
    setValueMonth(0)
  }

  const handleFilterChange = (event) => {
    setShowFiltered(event.target.value)
  }

  return (
    <>
    <h3>List of Journeys</h3>
    <h4>Please select the month:</h4>
    <Button text='May' handleClick={may_vote}/> <Button text='June' handleClick={june_vote}/> <Button text='July' handleClick={july_vote}/> <Button text='Hide list of Journeys' handleClick={hide_journeys_vote}/>
    <Journeys journeysMay={journeysMay} month={month} journeysJune={journeysJune} journeysJuly={journeysJuly} showFiltered={showFiltered} handleFilterChange={handleFilterChange}/>
    <h3>List of Stations</h3>
    <h4>Please push the button to fetch a list of stations</h4>
    <Button text='Stations' handleClick={stations_vote} /> <Button text='Hide list of Stations' handleClick={hide_stations_vote}/>
    <Stations value={value} stations={stations}/>
    </>
  )
}

export default App;