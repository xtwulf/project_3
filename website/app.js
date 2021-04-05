/* Global Variables */


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
    return newData;
  }
  
  catch(error) {
  console.log("error", error);
  }
};


// Async GET
const retrieveData = async (url='') =>{ 
const request = await fetch(url);
try {
// Transform into JSON
const allData = await request.json();
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

  
}


