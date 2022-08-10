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

export default SingleStationView