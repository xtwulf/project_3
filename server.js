// global vars

const apiKey = 'ec2a8c3202f503524ea99b9adbc61f8d';
const baseURL = 'http://api.openweathermap.org/';
const request = require('request');


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


app.use(express.json());

// Setup Server

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// GET route

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send('Please provide a search string...')
    }
    
        
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.search}&appid=ec2a8c3202f503524ea99b9adbc61f8d`;
    request( { url, json: true }, (error, {body}) => {
        if (error) {
            return res.send('Unable to connect.')
        }
        console.log(body);
        res.send(body)
    })
})
app.listen(3000, () => {
    console.log('Server is up!')
})