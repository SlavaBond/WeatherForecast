// JavaScript source code

let searchCity = document.querySelector("#search-city");


function changeCity(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = searchCity.value;
    //updateDate();
}

function updateDate() {
    let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let now = new Date();
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

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = updateDate();


let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);