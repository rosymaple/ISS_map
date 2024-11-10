let url ='https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

// adding tile layer to our page from last week...
// need to define map for our webpage as iss-map
let update = 10000 //turning our update number into a variable
let issMarker;

let map = L.map('iss-map').setView([0,0], 1)    // set view to whole world
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss() // call function once to start
setInterval(iss, update)     // send query every 10 seconds using update variable

// fetch expects one object and returns something called a promise
// a promise is a javascript object that promises the fetch will either be fulfilled or rejected
// res turns the raw plain text into a javascript object for our program to read
// res.json also returns a promise
function iss() {
    fetch(url).then(res => res.json()) // process response into JSON
        .then((issData) => {
            console.log(issData)     // display data on webpage
            let lat = issData.latitude
            let long = issData.longitude
            // create variables for our markers to work with our plain text json data
            issLat.innerHTML = lat
            issLong.innerHTML = long

            // create marker if one doesn't exist...
            // and move marker if it does exist
            if (!issMarker) {
                //create marker here
                issMarker = L.marker([lat, long]).addTo(map)
            } else {
                issMarker.setLatLng([lat, long])
            }

            // need to fetch time of query/data being sent...
            // we will define the current date/time using Date() and turn it into a variable called now.
            let now = Date()
            // add text template to the innerHTML of #time to our webpage
            timeIssLocationFetched.innerHTML = `This data was fetched at: ${now}`

        }).catch((err) => {     // catch API errors here such as network errors etc
        console.log('Error!', err)      // log error to console
    })
}       // end of iss function

