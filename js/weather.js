const APIKEY = '609e2c74c05369974bb2c51bf05b38e6';

function onGeoOk (position) {
    const lat = position.coords.latitude;
    const lon =  position.coords.longitude;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${APIKEY}&units=metric`;
    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
        const weather = document.querySelector('#weather span:first-child');
        const city = document.querySelector('#weather span:last-child');
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].description} / ${data.main.temp}도`;
    });
}

function onGeoError () {
    alert("can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);