//variaveis e seleção de eventos

const apiCountryURL = "https://countryflagsapi.com/png/";



const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector("#weather-data")

// Funções
const getWeatherData = async(city) => {
    try {
        const response = await fetch(`/.netlify/functions/fetch-weather?city=${city}`)  
        const data = await response.json();
        changeBG(city)
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if(data.cod == 404) {
        alert(data.message)
        return
    }

    cityElement.innerText = data.name;
    countryElement.setAttribute("src", apiCountryURL + data.sys.country )
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
}

const changeBG = (city) => {
    if (!city) {
        return
    }
    document.body.style.background = `url("https://source.unsplash.com/1280x720/?${city}+lugar") no-repeat center center`
    document.body.style.backgroundSize = 'cover'
}
//Eventos

searchBtn.addEventListener('click', (e) => {

    e.preventDefault()

    const city =  cityInput.value


    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        e.target.value = ''
        showWeatherData(city)
    }
})