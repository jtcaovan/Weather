const apiKey = '44d60556067ec6f2529d69194fa8e8b8';
const searchButton = document.getElementById('getWeather')
const city = document.getElementById('city');
const temperature = document.getElementById('temperature')
const weatherInfo = document.getElementById('info');
const feelsLike = document.getElementById('feelsLike')
const icon = document.getElementById('icon');
const searchIcon = document.getElementById('searchIcon');
const form = document.querySelector('form');
const high = document.getElementById('high');
const low = document.getElementById('low');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const date = document.getElementById('date');

const forecastOne = document.getElementById('forecastOne')

form.addEventListener('submit', e => {
    searchCity(e);
    form.reset();
})

searchIcon.addEventListener('click', e => {
    searchCity(e);
    form.reset();
})

// searchCity(url).catch(err => {
//     console.log('Could not find city')
//     console.log(err);

async function searchCity(e) {
    e.preventDefault()
    const city = document.getElementById('searchCity').value
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${apiKey}&units=imperial`
    const response = await fetch(url, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData)

    displayCity(weatherData)
    displayForecast(weatherData)
}

function displayCity(weatherData) {
    temperature.textContent = Math.round(weatherData.list[0].main.temp) + '°';
    city.textContent = weatherData.city.name
    weatherInfo.textContent = weatherData.list[0].weather[0].main;
    sunrise.textContent = 'Sunrise: ' + convertTime(weatherData.city.sunrise) + ' AM';
    sunset.textContent = 'Sunset: ' + convertTime(weatherData.city.sunset) + ' PM';
    date.textContent = convertDate(weatherData.city.sunrise)
    icon.src = `http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}`+ '.png';
}

function displayForecast(weatherData) {
    forecastOne.textContent = weatherData.list[1].main.temp
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
    // let weekday = date.toLocaleDateString("en-US", {weekday: "long"})
    let month = date.toLocaleDateString("en-US", {month: "long"})
    let day = date.toLocaleDateString("en-US", {day: "numeric"})
    let year = date.toLocaleDateString("en-US", {year: "numeric"})

    return (month + ' ' + day + ', ' + year);
}

    // feelsLike.textContent = `Feels like ` + weatherData.list[0].main.feels_like + '°';
    // high.textContent = 'H:' + Math.round(weatherData.list[0].main.temp_max) +  '°' +  '/';
    // low.textContent = 'L:' + Math.round(weatherData.list[0].main.temp_min) + '°';