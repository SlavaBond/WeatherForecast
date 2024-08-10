// Update Main weather data from API
function updateWeather(response) {
   // console.log(response.data);
   // console.log(response.data.condition.icon_url);
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



//////Get response from APIs
function searchCityFunc(city) {
    //API
    let key = 'b1047taba00ddd6f7042cee7ac3b7do3';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
    axios.get(apiUrl).then(updateWeather);
}

function getForecast(city) {
    let key = 'b1047taba00ddd6f7042cee7ac3b7do3';
    let apiUrlF = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}`;
    axios.get(apiUrlF).then(displayForecast);
}

///////////
function changeCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#search-city");
    searchCityFunc(searchCity.value);
    getForecast(searchCity.value);
}
let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

function updateDate(now) {
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   
    let hours = now.getHours();
    let minutes = now.getMinutes();

    let day = weekDays[now.getDay()];
    if (now.getHours < 10) {
        hours = `0${now.getHours}`;
    } if (now.getMinutes < 10) {
        minutes = `0${now.getMinutes}`;
    }
    return `${day} ${hours}:${minutes}`
}


function displayForecast(response) {
    // get all data from API into an array
    let dailyData = [];
    for (let i = 0; i < 7; i++) {
        dailyData[i] = response.data.daily[i];
    }
    
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];



    let forecast = '';
    for (let i = 0; i < 5; i++) {
        let date = new Date(dailyData[i].time * 1000);
        forecast += 
            `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${days[date.getDay()]}</div>
                    <img src=${dailyData[i].condition.icon_url} class="forecast-temp-icon" id="forecast-temp-icon" />
                    <div class="weather-forecast-temp">
                        <div class="forecast-temps"><strong>${Math.round(dailyData[i].temperature.maximum)}&deg</strong></div>
                        <div class="forecast-temps">${Math.round(dailyData[i].temperature.minimum)}&deg</div>
                    </div>
                </div>
    `
    }


    let weatherForecast = document.querySelector("#weather-forecast");
    weatherForecast.innerHTML = forecast;
}


searchCityFunc("Paris");
getForecast("Paris");

