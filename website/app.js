/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// add event listener to element with id 'generate'

var el = document.getElementById('generate');
el.addEventListener("click", postData, false);

// function postData
function postData() {
    console.log('generate clicked');
    let zip = document.getElementById('zip').value;
    console.log(zip);
}


