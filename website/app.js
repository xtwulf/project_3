/* Variables */

var allData = {};
let response_data = {};

// add event listener to element with id 'generate'
var el = document.getElementById('generate');
el.addEventListener("click", postGet, false);

// Async POST functions

// postData makes a POST request to the server with ZIP and Feelig-Input
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

try {
    // writing the Server response in the newData variable
    const newData = await response.json();
    // checking the response for errors
    if (newData.cod == 404) {
      throw {
        name: 'Input Error',
        message: 'Sorry, we didn´t found a city with ZIP ',
        code: newData.cod
      }
    }

    if (newData.cod != 200) {
      throw {
        name: 'Application Error',
        message: 'Sorry, something went wrong...!',
        code: newData.cod
      }
    }
    // return the received date for the combined function
    return newData;
  }
  
  // Error handling
  catch(error) {
    if (error.code == 404) {
      let zip = document.getElementById('zip').value;
      
      let country = document.getElementById('country').value;
      let country_name = document.getElementById('country').namedItem(country).text;
      message = error.name + "\n" + error.message + zip + " in country " + country_name;
      }
    
    else {
    message = error.name + "\n" + error.message;
      }
  
    alert(message);
  }
};


// Async GET Functions

const retrieveData = async (url='') =>{ 
const request = await fetch(url);
try {
  // Transform into JSON
  allData = await request.json();
}

catch(error) {
  console.log("error", error);
  alert("Sorry... An error occured:\n" + error.message);
}
};

// Function for updating the GUI elements
const updateGui = async (url='') =>{ 
  const request = await fetch(url);
  try {
  recent_data = await request.json();
  
  document.getElementById('date').innerHTML = "Date: " + recent_data["date"];
  document.getElementById('temp').innerHTML = "Temp °C: " + recent_data["temp_celsius"] + "/ K:" + recent_data["temp_kelvin"];
  document.getElementById('content').innerHTML = "Content: " + recent_data["feeling"];
  }
  
  catch(error) {
    console.log("error", error);
    alert("Sorry... An error occured:\n" + error.message);
    }
  };



// chain the async functions
function postGet(){
  let country = document.getElementById('country').value;
  let zip = document.getElementById('zip').value;
  let feeling = document.getElementById('feelings').value;
  
  //checking if the ZIP field ius empty
  if (!zip) {
    alert(`Please fill in the ZIP field`);
    return;
  }
  
  // Making the POST request on the /weather route
  postData('/weather', {country:country, zip:zip, feeling:feeling})
  
  // let´s update the GUI, now the data are available on the server
  .then(function(){
    updateGui('/recent');
  })
}
