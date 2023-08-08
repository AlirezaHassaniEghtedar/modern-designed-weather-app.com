const API = "4c4e02ab398ac2cd7b131a402c748b6d";

const submitBtn = document.querySelector(".search form button");

submitBtn.addEventListener("click" , (event) => {
    event.preventDefault();
    getWeather();
})

async function getWeather() {

    const cityName = String(document.querySelector(".search form input").value).toLowerCase();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();

    
    if(response.status >= 400) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }
    
    const icon = document.querySelector(".weather-icon");
    const temperature  = document.querySelector(".temp");
    const city = document.querySelector(".city");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".wind");

    switch(String(data.weather[0].main).toLowerCase()) {
        case "clouds":
            icon.src = "images/clouds.png"
            break;
        case "clear":
            icon.src = "images/clear.png"
            break;
        case "drizzle":
            icon.src = "images/drizzle.png"
            break;
        case "mist":
            icon.src = "images/mist.png"
            break;
        case "rain":
            icon.src = "images/rain.png"
            break;
        case "snow":
            icon.src = "images/snow.png"
            break;
    }

    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    city.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "m/s";

    if(response.status >= 200 && response.status < 400) {
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}