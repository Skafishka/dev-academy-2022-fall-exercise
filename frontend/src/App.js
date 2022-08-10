import { useState, useEffect } from 'react'
import noteService from './services/db'
import StationForm from './components/StationForm'
import Notification from './components/Notification'
import Journeys from './components/Journeys'
import Stations from './components/Stations'
import SingleStationView from './components/SingleStationView'

/*
// described Button carcase
*/

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

/*
// data fetching for months journeys
*/

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

/*
// data fetching for Stations
*/

  useEffect(() => {
    noteService
      .getStations()
      .then(initialNotes => {
        setStations(initialNotes)
      })
  }, [])

/*
// action for showing stations list
*/

  const stations_vote = () => {
    count_stations +=1
    setValue(count_stations)
  }

/*
// action for hiding stations list
*/ 

  const hide_stations_vote = () => {
    setValue(0)
  }

/*
// actions for showing months list
*/

  const may_vote = () => { 
    setValueMonth(count_may)
  }

  const june_vote = () => {
    setValueMonth(count_june)
  }

  const july_vote = () => {
    setValueMonth(count_july)
  }

/*
// action for hiding months list
*/

  const hide_journeys_vote = () => {
    setValueMonth(0)
  }

/*
// action for handling of journeys filter
*/

  const handleFilterChange = (event) => {
    setShowFiltered(event.target.value)
  }

/*
// action for handling of stations filter
*/

  const handleFilterChangeSt = (event) => {
    setShowFilteredStations(event.target.value)
  }

/*
// action for calculating statistic of single station
*/

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

/*
// actions for adding a new station
*/

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