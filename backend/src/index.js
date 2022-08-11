const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))

/*
// Connect to databases MongoDB for May and June journey sets created on one free Cluster with maximum size 512mb.  
*/

const password_05_06 = 'XB14JYZiCxlN1j1v'
const url_05_06 = `mongodb+srv://solita-dev-academy:${password_05_06}@cluster0.ipmn7cb.mongodb.net/solita?retryWrites=true&w=majority`
var conn = mongoose.createConnection(url_05_06)

/*
// Creating Schema for May journey set
*/

const citybikes_may_Schema = mongoose.Schema(
      {
        "Departure": { type: Date },
        "Return": { type: Date },
        "Departure station id": { type: Number },
        "Departure station name": { type: String },
        "Return station id": { type: Number },
        "Return station name": { type: String },
        "Covered distance (m)": { type: Number },
        "Duration (sec)": { type: Number },
        "id": { type: Number}
      },
    { collection: 'may' }
)

const Citybike_may = conn.model('may', citybikes_may_Schema)

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
// Fetching data for May journey on separate link with results limited by 1000 objects
*/

app.get('/citybike/may', (req, res) => {
    Citybike_may.find({ "Covered distance (m)" : { $gt : 10 }, "Duration (sec)" : { $gt : 10 } })
    .limit(1000)
    .then(journey => {res.json(journey)})
})

/*
// Creating Schema for June journey set
*/

const citybikes_june_Schema = mongoose.Schema({
    "Departure": { type: Date },
    "Return": { type: Date },
    "Departure station id": { type: Number },
    "Departure station name": { type: String },
    "Return station id": { type: Number },
    "Return station name": { type: String },
    "Covered distance (m)": { type: Number },
    "Duration (sec)": { type: Number },
    "id": { type: Number}    
},
    { collection: 'june' }
)

const Citybike_june = conn.model('Citybike_june', citybikes_june_Schema)

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
// Fetching data for June journey on separate link with results limited by 1000 objects
*/

app.get('/citybike/june', (req, res) => {
    Citybike_june.find({ "Covered distance (m)" : { $gt : 10 }, "Duration (sec)" : { $gt : 10 } })
    .limit(1000)
    .then(journey => {res.json(journey)})
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
    "Departure": { type: Date },
    "Return": { type: Date },
    "Departure station id": { type: Number },
    "Departure station name": { type: String },
    "Return station id": { type: Number },
    "Return station name": { type: String },
    "Covered distance (m)": { type: Number },
    "Duration (sec)": { type: Number },
    "id": { type: Number}  
},
    { collection: 'july' }
)

const Citybike_july = conn2.model('Citybike_july', citybikes_july_Schema)

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
// Fetching data for July journey on separate link with results limited by 1000 objects
*/

app.get('/citybike/july', (req, res) => {
    Citybike_july.find({ "Covered distance (m)" : { $gt : 10 }, "Duration (sec)" : { $gt : 10 } })
    .limit(1000)
    .then(journey => {res.json(journey)})
})

/*
// Creating Schema for stations set
*/

const stations_Schema = mongoose.Schema({
    "FID": { type: Number },
    "ID": { type: Number },
    "NIMI": { type: String },
    "Namn": { type: String },
    "Name": { type: String },
    "Osoite": { type: String },
    "Adress": { type: String },
    "Kaupunki": { type: String },
    "Stad": { type: String },
    "Operaattor": { type: String },
    "Kapasiteet": { type: Number },
    "x": { type: Number },
    "y": { type: Number },   
},
    { collection: 'stations' }
)

const Stations = conn2.model('Stations', stations_Schema)

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

/*
// Fetching data for stations on separate link with results
*/

app.get('/citybike/stations', (req, res) => {
    Stations.find({}).then(station => {res.json(station)})
})

/*
// Adding a possibility to POST new stations on the list
*/

app.post('/citybike/stations', (req, res) => {
    const body = req.body

    const station = new Stations({
        "Name": body.Name,
        "Adress": body.Adress,
    })

    station.save().then(savedStation => {
        res.json(savedStation)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}) 