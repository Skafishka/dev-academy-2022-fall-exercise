const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

/*
// Connect to databases MongoDB for May and June journey sets created on one free Cluster with maximum size 512mb.  
*/

const password_05_06 = 'XB14JYZiCxlN1j1v'
const url_05_06 = `mongodb+srv://solita-dev-academy:${password_05_06}@cluster0.ipmn7cb.mongodb.net/solita?retryWrites=true&w=majority`
var conn = mongoose.createConnection(url_05_06)

/*
// Creating Schema for May journey set
*/

const citybikes_may_Schema = mongoose.Schema({
    departure: Date,
    return: Date,
    departure_station_id: Number,
    departure_station_name: String,
    return_station_id: Number,
    return_station_name: String,
    covered_distance_m: Number,
    duration_sec: Number,
},
    { collection: 'may' }
)

const Citybike_may = conn.model('Citybike_may', citybikes_may_Schema)

/*
// Fetching data for May journey on separate link with results limited by 100 objects
*/

app.get('/citybike/may', (req, res) => {
    Citybike_may.find({}).limit(100).then(journey => {res.json(journey)})
})

/*
// Deleting "_id" and linking it value to "id" naming for easy reading of database
*/

citybikes_may_Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id   
    }
})

/*
// Creating Schema for June journey set
*/

const citybikes_june_Schema = mongoose.Schema({
    departure: Date,
    return: Date,
    departure_station_id: Number,
    departure_station_name: String,
    return_station_id: Number,
    return_station_name: String,
    covered_distance_m: Number,
    duration_sec: Number,    
},
    { collection: 'june' }
)

const Citybike_june = conn.model('Citybike_june', citybikes_june_Schema)

/*
// Fetching data for June journey on separate link with results limited by 100 objects
*/

app.get('/citybike/june', (req, res) => {
    Citybike_june.find({}).limit(100).then(journey => {res.json(journey)})
})

/*
// Deleting "_id" and linking it value to "id" naming for easy reading of database
*/

citybikes_june_Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id   
    }
})

/*
// Connect to databases MongoDB for July journey set created on second free Cluster with maximum size 512mb.  
*/

const password_07 = 'oCOlI9mTphKdVW9k'
const url_07 = `mongodb+srv://solita-dev-academy-2:${password_07}@cluster0.kp7zfuj.mongodb.net/solita?retryWrites=true&w=majority`
var conn2 = mongoose.createConnection(url_07)

/*
// Creating Schema for July journey set
*/

const citybikes_july_Schema = mongoose.Schema({
    departure: Date,
    return: Date,
    departure_station_id: Number,
    departure_station_name: String,
    return_station_id: Number,
    return_station_name: String,
    covered_distance_m: Number,
    duration_sec: Number,   
},
    { collection: 'july' }
)

const Citybike_july = conn2.model('Citybike_july', citybikes_july_Schema)

/*
// Fetching data for July journey on separate link with results limited by 100 objects
*/

app.get('/citybike/july', (req, res) => {
    Citybike_july.find({}).limit(100).then(journey => {res.json(journey)})
})

/*
// Deleting "_id" and linking it value to "id" naming for easy reading of database
*/

citybikes_july_Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
})

/*
// Creating Schema for stations set
*/

const stations_Schema = mongoose.Schema({
    departure: Date,
    return: Date,
    departure_station_id: Number,
    departure_station_name: String,
    return_station_id: Number,
    return_station_name: String,
    covered_distance_m: Number,
    duration_sec: Number,   
},
    { collection: 'stations' }
)

const Stations = conn2.model('Stations', stations_Schema)

/*
// Fetching data for stations on separate link with results limited by 100 objects
*/

app.get('/citybike/stations', (req, res) => {
    Stations.find({}).limit(100).then(station => {res.json(station)})
})

/*
// Deleting double naming for easy reading of database
*/

stations_Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.Nimi
      delete returnedObject.Namn
      delete returnedObject.Osoite
      delete returnedObject.Stad
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}) 