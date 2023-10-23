const apiKey = "cbc079521073340dc72ab4388cd0aee4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=ithaca";

async function checkWeather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
}

checkWeather();