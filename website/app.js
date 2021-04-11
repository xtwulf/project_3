/* Global Variables */

//const { response } = require("express");

var allData = {};

// const express = require("express");

let response_data = {};
// add event listener to element with id 'generate'

var el = document.getElementById('generate');
el.addEventListener("click", postGet, false);


// Async POST

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
    //console.log("response1:", response);
    const newData = await response.json();
    console.log("new_data",newData.cod);
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
/*
    elseif (newData.cod != 200) {
      throw {
        name: 'Application Error',
        message: 'Ups... Something went wrong with your Entry. Please try again!'
      }
    }

*/
    //response_data = newData;
    //console.log("response2", response.status);
    return newData;
  }
  
  catch(error) {
  console.log("msg:",error);
  
  if (error.code == 404) {
    let zip = document.getElementById('zip').value;
    message = error.name + "\n" + error.message + zip;
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
//console.log(allData);

}
catch(error) {
  console.log("error", error);
  // appropriately handle the error
}
};

const updateGui = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  recent_data = await request.json();
  console.log("recent:",recent_data);
  document.getElementsByClassName('holder entry')[0].style.zIndex = 99;
  document.getElementById('date').innerHTML = "Date: " + recent_data["date"];
  document.getElementById('temp').innerHTML = "Temp °C: " + recent_data["temp_celsius"] + "/ K:" + recent_data["temp_kelvin"];
  document.getElementById('content').innerHTML = "Content: " + recent_data["feeling"];
  
  }
  
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
  };



// chain the async functions
function postGet(){
  let zip = document.getElementById('zip').value;
  let feeling = document.getElementById('feelings').value;

  if (!zip) {
    alert(`Please fill in the ZIP field`);
    return;
  }
  
  postData('/weather', {zip:zip, feeling:feeling})
  

  /*
  .then(function(data){
    retrieveData('/all')

  })
  */


  .then(function(){
    
    updateGui('/recent');

  })
  }






/*    
function updateGui() {
  document.getElementsByClassName('holder entry')[0].style.zIndex = 99;
  
  
  //document.getElementById('date').innerHTML = response_data[recent_nr].date;

}*/





