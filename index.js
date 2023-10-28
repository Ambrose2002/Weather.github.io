const apiKey = "cbc079521073340dc72ab4388cd0aee4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const background = document.querySelector('body');
const checkbox = document.querySelector("#accept");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    checkbox.checked = false;


    if (response.status === 404){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('.switch').style.display = 'none';
        document.getElementsByClassName('unit')[0].style.display = 'none';
        document.getElementsByClassName('unit')[1].style.display = 'none';

    }
    else {
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.switch').style.display = 'inline-block';
        document.getElementsByClassName('unit')[0].style.display = 'inline-block';
        document.getElementsByClassName('unit')[1].style.display = 'inline-block';
    }


    console.log(data);
    let temperature = Math.round(data.main.temp)


    checkbox.addEventListener('change', (event) => {
        if (checkbox.checked){
            let fTemp = ((9/5)*(temperature)) + 32;
            fTemp = Math.round(fTemp);
            document.querySelector('.temp').innerHTML = fTemp + '°F';

        }else{
            document.querySelector('.temp').innerHTML = temperature + '°C';
        }
    })


    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.temp').innerHTML = temperature + '°C';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
    document.querySelector('.weather').style.display = 'block';

    if (data.weather[0].main === "Clouds"){
        weatherIcon.src = "images/clouds.png";
        background.style.backgroundImage = 'url("images/cloudy_background.jpeg")';
        document.querySelector('.message').style.color = "#ebfffc"
    }
    else if (data.weather[0].main === "Clear"){
        weatherIcon.src = "images/clear.png";
        background.style.backgroundImage = 'url("images/clear_background.jpeg")';
        document.querySelector('.message').style.color = "#091a2e"
    }
    else if (data.weather[0].main === "Rain"){
        weatherIcon.src = "images/rain.png";
        background.style.backgroundImage = 'url("images/rainy_background.jpeg")';
    }
    else if (data.weather[0].main === "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
        background.style.backgroundImage = 'url("images/rainy_background.jpeg")';
    }
    else if (data.weather[0].main === "Mist"){
        weatherIcon.src = "images/mist.png";
        background.style.backgroundImage = 'url("images/misty_background.jpeg")';
    }


    var i = 0;
    var speed = 10;


    function typeWriter() {
    if (i < txt.length) {
        document.querySelector('.message span').innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        }
    }


    if (temperature < 16){
        document.querySelector('.message span').innerHTML = "";
        var txt = "Hey there, when it's chilly outside, it's all about staying cozy. Opt for a winter coat or parka to keep the cold at bay. Layer up with a warm sweater or thermal layers under your long-sleeve shirts, and don't forget those trusty thick pants or jeans!"
        document.querySelector('.message').addEventListener("load", typeWriter());
        document.querySelector('.message').style.fontSize = '40px'
    }
    else if (temperature >= 16){
        document.querySelector('.message span').innerHTML = "";
        var txt = "Hey, it's a scorcher out there! To beat the heat, go for lightweight, loose-fitting clothing. Reach for those comfy T-shirts or tank tops and pair them with shorts or skirts for that summer vibe."
        document.querySelector('.message').addEventListener("load", typeWriter(txt));
        document.querySelector('.message').style.fontSize = '40px'
    }
    else if(data.weathr[0].main === 'Snow'){
        document.querySelector('.message span').innerHTML = "";
        var txt = "When the snow starts falling, it's time to bundle up! Grab an insulated and waterproof winter coat to stay warm and dry. Layer up with snow pants or insulated trousers and thermal layers."
        document.querySelector('.message').addEventListener("load", typeWriter(txt));
        document.querySelector('.message').style.fontSize = '40px'
    }


};


searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value)
});


searchBox.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13) { // key code of the keybord key
        event.preventDefault();
	    checkWeather(searchBox.value);
    }
});
