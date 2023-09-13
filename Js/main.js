const apiKey = "aec6d6961d2871ca5132773ed2ef34b0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=a11b93ca6ca092efb7c0acb8e73df770&units=metric&q=";

const searchBox =document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
async function checkWeather(cityName){

    const response = await fetch(apiUrl + cityName );//+ `&appid = ${apiKey}`

    var data = await response.json();
    //
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)  + "c°"}`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${Math.round(data.wind.speed)} Km/h`
}

searchBtn.addEventListener("click", ()=>{
     checkWeather(searchBox.value);
} );
