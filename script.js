
const apiKey = '44d60556067ec6f2529d69194fa8e8b8';
const city = document.getElementById('city');
const temperature = document.getElementById('temperature')
const weatherInfo = document.getElementById('info');
const icon = document.getElementById('icon');
const searchIcon = document.getElementById('searchIcon');
const form = document.querySelector('form');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const date = document.getElementById('date');
const feelsLike = document.getElementById('feelsLike');
const alert = document.getElementById('alertBox')


let forecast = document.querySelectorAll('.forecast');
let forecastDate = document.querySelectorAll('.forecastDate');
let forecastIcon = document.querySelectorAll('.forecastIcon');
let forecastInfo = document.querySelectorAll('.forecastInfo');
let forecastTemp = document.querySelectorAll('.forecastTemp');

form.addEventListener('submit', e => {
    if (alert.classList.contains('visible')) {
        alert.classList.remove('visible');
        alert.classList.add('invisible');
    }
    let city = document.getElementById('searchCity').value
    e.preventDefault()
    searchCity(city);
    form.reset();
})

searchIcon.addEventListener('click', e => {
    searchCity(e);
    form.reset();
})

async function searchCity(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${apiKey}&units=imperial`
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData)
    
        displayCity(weatherData)
        displayForecast(weatherData)
    } catch (error) {
        alert.classList.add("visible");
        alert.classList.remove("invisible");
    }
}


function displayCity(weatherData) {
    temperature.textContent = Math.round(weatherData.list[0].main.temp) + '°';
    city.textContent = weatherData.city.name
    weatherInfo.textContent = weatherData.list[0].weather[0].description
    feelsLike.textContent = 'Feels like ' + Math.round(weatherData.list[0].main.feels_like) + '°'
    sunrise.textContent = 'Sunrise: ' + convertTime(weatherData.city.sunrise) + ' AM';
    sunset.textContent = 'Sunset: ' + convertTime(weatherData.city.sunset) + ' PM';
    date.textContent = convertDate(weatherData.city.sunrise)
    icon.src = `http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}`+ '.png';
}

function displayForecast(weatherData) {
    forecast[0].remove();
    for (let i = 1; i < 7; i++) {
        let today = new Date()
        today.setDate(today.getDate() + i);
        forecastDate[i].textContent = today.toLocaleString('en-US', {weekday: 'long'});
        forecastIcon[i].src = `http://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}`+ '.png';
        forecastInfo[i].textContent = weatherData.list[i].weather[0].main;
        forecastTemp[i].textContent = Math.round(weatherData.list[i].main.temp) + '°';
    }
}  

let convertTime = (unix) => {
    let date = new Date(unix * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    if (hours > 12) {
        hours -= 12;
    }

    return (hours + ':' + minutes.substr(-2));
}

let convertDate = (unix) => {
    let date = new Date(unix * 1000);
    let month = date.toLocaleDateString("en-US", {month: "long"})
    let day = date.toLocaleDateString("en-US", {day: "numeric"})
    let year = date.toLocaleDateString("en-US", {year: "numeric"})

    return (month + ' ' + day + ', ' + year);
}

searchCity("Long Beach");

// let convertTemperature = () => {
//     let button = document.getElementById('conversionButton');
//     button.addEventListener('click', () => {
//     })
// }

// convertTemperature();