const apiKey = "aec6d6961d2871ca5132773ed2ef34b0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=a11b93ca6ca092efb7c0acb8e73df770&units=metric&q=";

const searchBox =document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(cityName){

    const response = await fetch(apiUrl + cityName );//+ `&appid = ${apiKey}`

    if(response.status == 404){
        document.querySelector(".error-message").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{

    var data = await response.json();


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)  + "c°"}`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${Math.round(data.wind.speed)} Km/h`

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./Images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./Images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./Images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./Images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "./Images/mist.png";
    }else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "./Images/snow.png";
    }
    document.querySelector(".error-message").style.display = "none";
    document.querySelector(".weather").style.display = "block";

}
}

searchBtn.addEventListener("click", ()=>{
     checkWeather(searchBox.value);
} );
