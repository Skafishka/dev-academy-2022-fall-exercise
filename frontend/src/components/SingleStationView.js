const SingleStationView = ({ count, stationName, stationAddress, departureCount, returnCount }) => {
    if (count > 0) {
      return (
        <>
          <h4>Station name: {stationName}</h4>
          <h4>Station address: {stationAddress}</h4>
          <h4>Total number of journeys starting from the station for 3 months: {departureCount}</h4>
          <h4>Total number of journeys ending at the station for 3 months: {returnCount}</h4>
        </>
      )
    }
  }

export default SingleStationView