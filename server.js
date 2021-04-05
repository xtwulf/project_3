// global vars
const apiKey = 'ec2a8c3202f503524ea99b9adbc61f8d';
const baseURL = 'http://api.openweathermap.org/';
const request = require('request');
const data = [];

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

// GET routes

app.get('/', (req, res) => {
    console.log ("get request on home");
    res.send("GET on home");
});


app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
  //response.send("test");
};


// POST routes
app.post('/weather', (req, res) => {
    let data = [];
    let zip = req.body.zip;
    console.log(req.body);
    
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.zip},de&APPID=${apiKey}`
    //const url = 'http://api.openweathermap.org/data/2.5/weather?q=Hinterweidenthal,de&APPID=ec2a8c3202f503524ea99b9adbc61f8d';
    request({url: url, json: true}, (error, {body}) => { res.send(body) });
    projectData
    });
