import { Table } from "antd";
import { useState } from 'react';
import SingleStationView from '../components/SingleStationView'

const Stations = ({value, 
                  stations, 
                  handleSingleStation, 
                  count, 
                  departureCount, 
                  returnCount, 
                  stationName, 
                  stationAddress 
                }) => {
 
  const [showFilteredStations, setShowFilteredStations] = useState('')
  
  // action for handling of stations filter
  const handleFilterChangeSt = (event) => {
    setShowFilteredStations(event.target.value)
  }

  const dataSource = stations.filter(station => station["Name"].toLowerCase().includes(showFilteredStations.toLowerCase()))
  const columns = [
    {
      title: 'Name',
      render: (values, data) => {
        return data["Name"];
      }
    },
    {
      title: 'Address',
      render: (values, data) => {
        return data["Adress"];
      }
    },
    {
      title: 'Capacity',
      render: (values, data) => {
        return data["Kapasiteet"];
      }
    },
    {
      title: 'Station Statistic',
      render: (values, data) => {
        return (
          <>
            <button 
              onClick={() => 
                handleSingleStation(data.Name, data.Adress)}>Push to see a single station view (above)
            </button>
          </>
        )        
      }
    },
  ]

  if (value) {
    return (
      <>
        <h4>Search filter by station name: </h4> <input value={showFilteredStations} onChange={handleFilterChangeSt}/>
        <SingleStationView 
          count={count} 
          departureCount={departureCount} 
          returnCount={returnCount} 
          stationName={stationName} 
          stationAddress={stationAddress} 
        />
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          rowKey={value => Math.random() * Object.values(value).length}        
          tableLayout="auto"
          bordered          
        />
      </>
    )
  }
}

export default Stations