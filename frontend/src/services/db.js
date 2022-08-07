import axios from 'axios'
const url_may = `http://localhost:3001/citybike/may`
const url_june = `http://localhost:3001/citybike/june`
const url_july = `http://localhost:3001/citybike/july`
const url_stations = `http://localhost:3001/citybike/stations`

const getMay = () => {
    const req = axios.get(url_may)
    return req.then(res =>
        res.data)
}

const getJune = () => {
    const req = axios.get(url_june)
    return req.then(res =>
        res.data)
}

const getJuly = () => {
    const req = axios.get(url_july)
    return req.then(res =>
        res.data)
}

const getStations = () => {
    const req = axios.get(url_stations)
    return req.then(res =>
        res.data)
}

export default {
    getMay,
    getJune,
    getJuly,
    getStations,
}