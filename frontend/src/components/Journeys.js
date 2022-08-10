import moment from 'moment'
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

export default Journeys