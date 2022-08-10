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

export default Stations