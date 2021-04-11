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

app.get('/recent', sendRecentEntry);

function sendRecentEntry(request, response) {
  let length = Object.keys(projectData).length;
  let lastEntry = projectData[length];
  console.log(length);
  response.send(projectData[length-1]);

}


//==== Check ZIP ===//
/*
app.get('/check', checkZip);

function checkZip(request, response) {
//  console.log("check Zip called");
  // console.log("request body:", request.body);
  

  let zip = request.body.zip;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${request.body.zip},de&APPID=${apiKey}`

  request({url: url, json: true}, (error, {body}) => {
    console.log(response.body);

  })

  response.send({"status" : false, "error" : "invalid ZIP"});
}
*/


// POST routes
app.post('/weather', (req, res) => {
    let data = [];
    let zip = req.body.zip;
    let comment = req.body.feeling;
    console.log(req.body);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.zip},de&APPID=${apiKey}`
    
    request({url: url, json: true}, (error, {body}) => { 
        
        //error handling
        // tbd
        if (body.cod != "200") {
          console.log("error, city not found");
          //res.send("Error, city not found!")
          res.send(body);
          console.log("body:",body);

          return;
        }
        
        res.send(body);

        //console.log(url);
        console.log(body);
        //console.log("Jetzt in projectData schreiben");

        let length = Object.keys(projectData).length;
        let date = buildDate(body.dt);
        let temp_celsius = convertTemp(body.main.temp);
        let temp_kelvin = body.main.temp;
        
        projectData[length] = {"date" : date, "feeling" : comment, "temp_kelvin" : temp_kelvin, "temp_celsius" : temp_celsius} ;
        console.log(projectData);
    });
});

// helping functions
function buildDate (res_date) {
  var date = new Date(res_date*1000);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();

  return (`${year} - ${month} - ${day} / ${hour}:${minute}`);
}

function convertTemp (temp) {
  return (Math.round((temp-273.15) * 100) / 100);
  
}