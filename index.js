// JavaScript source code
function updateWeather(response) {
    console.log(response.data);
    console.log(response.data.condition.icon_url);
    let currentTemp = document.querySelector("#current-temp");
    let currentCity = document.querySelector("#city");
    let currentDescription = document.querySelector("#description");
    let currentHumidity = document.querySelector("#humidity");
    let currentWind = document.querySelector("#wind");
    let currentDate = document.querySelector("#current-date");
    let currentIcon = document.querySelector("#current-icon");
    let date = new Date(response.data.time * 1000);

    currentDate.innerHTML = updateDate(date);
    currentIcon.setAttribute("src", response.data.condition.icon_url);
    currentTemp.innerHTML = Math.round(response.data.temperature.current);
    currentCity.innerHTML = response.data.city;
    currentDescription.innerHTML = response.data.condition.description;
    currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    currentWind.innerHTML = `${response.data.wind.speed}km/h`;
}


function searchCityFunc(city) {
    //API
    let key = 'b1047taba00ddd6f7042cee7ac3b7do3';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
    axios.get(apiUrl).then(updateWeather);
}



function changeCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#search-city");
    searchCityFunc(searchCity.value);
}
let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

function updateDate(now) {
    let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
   
    let hours = now.getHours();
    let minutes = now.getMinutes();

    let day = weekDays[now.getDay()-1];
    if (now.getHours < 10) {
        hours = `0${now.getHours}`;
    } if (now.getMinutes < 10) {
        minutes = `0${now.getMinutes}`;
    }
    return `${day} ${hours}:${minutes}`
}


function displayForecast() {
    let weatherForecast = document.querySelector("#weather-forecast");

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    let forecast = '';
    days.forEach(function (day) {
        forecast += 
            `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${day}</div>
                    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" class="forecast-temp-icon" id="forecast-temp-icon" />
                    <div class="weather-forecast-temp">
                        <div class="forecast-temps"><strong>15°</strong></div>
                        <div class="forecast-temps">10°</div>
                    </div>
                </div>
    `
    });
    weatherForecast.innerHTML = forecast;
}


searchCityFunc("Paris");
displayForecast();

