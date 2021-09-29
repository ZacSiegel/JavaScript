
// SELECTORS
const apiKey = '0d8e3f5586eddf8425d1eb952e4b5993'
const cityName = document.querySelector('.city')
const time = document.querySelector('.time')
const temp = document.querySelector('.temp')
const icon = document.querySelector('.icon')
const description = document.querySelector('.description')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind')
const searchBtn = document.querySelector('#search-button')
const form = document.querySelector('#search-form')
const body = document.querySelector('.body')


// FETCH WEATHER FROM API/APPEND TO PAGE
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        const data = await response.json()

        cityName.innerHTML = `<i class="fas fa-globe"></i> Weather in ${data.name} (${data.sys.country})`
        temp.innerHTML = `${Math.round(data.main.temp)}°F`
        description.innerHTML = `${(data.weather[0].description).toUpperCase()}`
        humidity.innerHTML = `<i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%`
        windSpeed.innerHTML = `<i class="fas fa-wind"></i> Wind speed: ${Math.round(data.wind.speed * 2.236936)} Mph `
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }
    catch (error) {
        alert('Something went wrong! Try again.', error)
    }
}

// USE SEARCH VALUE (CITY) FOR FETCHING WEATHER
const submit = form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const search = document.querySelector('.search-bar')
    const city = search.value
    await fetchWeather(city)
})

const btnSubmit = searchBtn.addEventListener('click', async function () {
    const search = document.querySelector('.search-bar')
    const city = search.value
    await fetchWeather(city)
})
