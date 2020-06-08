// window.addEventListener('load', () => {
//     let long;
//     let lat;

//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(position => {
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             const proxy = "https://cors-anywhere.herokuapp.com/"
//              const api = '${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}';

//              fetch(api)
//                 .then(response => {
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log(data);
//                 }); 

//         });
         
//     }
// });

const api = {
    key : "c56b2c95051e219925458643184a4128", 
    base : "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}
    
function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    // fetch('${api.base}weather?q=${query}&units=metric&APPID=${api.key}')
        .then( weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let data = document.querySelector('.location .date');
    data.innerText = dataBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C/ ${Math.round(weather.main.temp_max)}°C`
}

function dataBuilder (d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];
    let days =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Firday", "Saturdat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}