/* Global Variables */

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
    const newData = await response.json();
    //console.log(newData);
    //response_data = newData;
    return newData;
  }
  
  catch(error) {
  console.log("error", error);
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
  
  postData('/weather', {zip:zip, feeling:feeling})
  .then(function(data){
    retrieveData('/all')

  })


  .then(function(){
    
    updateGui('/recent');

  })
  }






/*    
function updateGui() {
  document.getElementsByClassName('holder entry')[0].style.zIndex = 99;
  
  
  //document.getElementById('date').innerHTML = response_data[recent_nr].date;

}*/





