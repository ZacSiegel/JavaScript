
// SELECTORS
const apiKey = '0d8e3f5586eddf8425d1eb952e4b5993'
const cityName = document.querySelector('.city')
const temp = document.querySelector('.temp')
const icon = document.querySelector('.icon')
const description = document.querySelector('.description')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind')
const searchBtn = document.querySelector('#search-button')


// FETCH WEATHER FROM API/APPEND TO PAGE
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        console.log(response)
        const data = await response.json()
        console.log(data)
        cityName.innerHTML = `Weather in ${data.name}`
        temp.innerHTML = `${Math.round(data.main.temp)}°F`
        description.innerHTML = `Description: ${(data.weather[0].description).toUpperCase()}`
        humidity.innerHTML = `Humidity: ${data.main.humidity}%`
        windSpeed.innerHTML = `Wind speed: ${Math.round(data.wind.speed * 2.236936)} Mph `
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }
    catch (error) {
        alert('Something went wrong! Try again.', error)
    }
}

// USE SEARCH VALUE (CITY) FOR FETCHING WEATHER
const submit = searchBtn.addEventListener('click', async function () {
    const search = document.querySelector('.search-bar')
    const city = search.value
    await fetchWeather(city)
})

