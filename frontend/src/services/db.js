import axios from 'axios'
const url_may = `/citybike/may`
const url_june = `/citybike/june`
const url_july = `/citybike/july`
const url_stations = `/citybike/stations`

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

const create = newObject => {
    const req = axios.post(url_stations, newObject)
    return req.then(res => res.data)
}

export default {
    getMay,
    getJune,
    getJuly,
    getStations,
    create,
}