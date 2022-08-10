import { useState, useEffect } from 'react'
import noteService from './services/db'
import moment from 'moment'
import StationForm from './components/StationForm'
import Notification from './components/Notification'
var momentDurationFormatSetup = require("moment-duration-format")

const Journeys = (props) => {
  if (props.month === 1) {
    return (
      <>
        <h4>Search journey filter by station's departure or return name: </h4> <input value={props.showFiltered} onChange={props.handleFilterChange}/>
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
        <h4>Search journey filter by station's departure or return name: </h4> <input value={props.showFiltered} onChange={props.handleFilterChange}/>
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
        <h4>Search journey filter by station's departure or return name:</h4> <input value={props.showFiltered} onChange={props.handleFilterChange}/>
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
      <h4>Search filter by station name: </h4> <input value={props.showFilteredStations} onChange={props.handleFilterChangeSt}/>
      <table>
        <tbody>
          {props.stations.filter(station => station["Name"].toLowerCase()
            .includes(props.showFilteredStations.toLowerCase()))
            .map((value, id) => (
              <tr key={id.toString()}>
                <td><b>Name: </b>{value["Name"]}</td><td><b>Address: </b>{value["Adress"]}</td><td><b>Capacity: </b>{value["Kapasiteet"]}</td><td><button onClick={() => props.handleSingleStation(value.Name, value.Adress)}>Push to see a single station view (above)</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}}

const SingleStationView = (props) => {
  if (props.count > 0) {
    return (
      <>
        <h4>Station name: {props.stationName}</h4>
        <h4>Station address: {props.stationAddress}</h4>
        <h4>Total number of journeys starting from the station for 3 months: {props.departureCount}</h4>
        <h4>Total number of journeys ending at the station for 3 months: {props.returnCount}</h4>
      </>
    )
  }
}

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
  const [showFilteredStations, setShowFilteredStations] = useState('')
  var count_stations = 0
  var count_may = 1
  var count_june = 2
  var count_july = 3
  var start = 0
  const [count, setCount] = useState(0)
  const [departureCount, setDepartureCount] = useState(0)
  const [returnCount, setReturnCount] = useState(0)
  const [stationName, setStationName] = useState('')
  const [stationAddress, setStationAddress] = useState('')
  const [newName, setNewName] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newMessage, setNewMessage] = useState(null)

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

  const handleFilterChangeSt = (event) => {
    setShowFilteredStations(event.target.value)
  }

  const handleSingleStation = (Name, Adress) => {
    start += 1
    setCount(start)
    setStationName(Name)
    setStationAddress(Adress)
    setDepartureCount(journeysMay.filter(q => q["Departure station name"] === Name).length 
                    + journeysJune.filter(q => q["Departure station name"] === Name).length
                    + journeysJuly.filter(q => q["Departure station name"] === Name).length)
    setReturnCount(journeysMay.filter(q => q["Return station name"] === Name).length 
                  + journeysJune.filter(q => q["Return station name"] === Name).length
                  + journeysJuly.filter(q => q["Return station name"] === Name).length)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value)
  }

  const addStation = (event) => {
    event.preventDefault()
    const stationObject = {
      Name: newName,
      Adress: newAddress
    }
    if (stations.find(station => {return (JSON.stringify(station.Name) === JSON.stringify(newName)) })) {
      window.alert(`${newName} is already added to the Stations list`) 
      setNewName('')
      setNewAddress('')
    } else {
      noteService
        .create(stationObject)
        .then(() => {
          setStations(stations.concat(stationObject))
          setNewMessage(`${newName} was added`)
          setTimeout(() => {
            setNewMessage(null)
          }, 2000)
          setNewName('')
          setNewAddress('')
        })
    }
  }

  return (
    <>
      <h3>List of Journeys</h3>
        <h4>Please select the month:</h4>
          <Button text='May' handleClick={may_vote}/> <Button text='June' handleClick={june_vote}/> <Button text='July' handleClick={july_vote}/> <Button text='Hide list of Journeys' handleClick={hide_journeys_vote} />
          <Journeys journeysMay={journeysMay} month={month} journeysJune={journeysJune} journeysJuly={journeysJuly} showFiltered={showFiltered} handleFilterChange={handleFilterChange} />
      <h3>List of Stations</h3>
        <h4>Add a new station: <StationForm addStation={addStation} newName={newName} handleNoteChange={handleNoteChange} newAddress={newAddress} handleAddressChange={handleAddressChange} /></h4>
          <Notification message={newMessage} />
          
        <h4>Please push the button to fetch a list of stations:</h4>
          <Button text='Stations' handleClick={stations_vote} /> <Button text='Hide list of Stations' handleClick={hide_stations_vote} />
          <SingleStationView count={count} departureCount={departureCount} returnCount={returnCount} stationName={stationName} stationAddress={stationAddress} />
          <Stations value={value} stations={stations} showFilteredStations={showFilteredStations} handleFilterChangeSt={handleFilterChangeSt} handleSingleStation={handleSingleStation} />
    </>
  )
}

export default App;