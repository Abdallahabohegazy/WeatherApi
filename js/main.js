

// Today variables
let todayName = document.getElementById("today-date-day-name");
let todayNumber = document.getElementById("today-date-day-number");
let todayMonth = document.getElementById("today-date-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity  = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");


// next data
let nextDay = document.getElementsByClassName("next-day-name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMinTemp = document.getElementsByClassName("next-min-temp"); 
let nextConditionImg = document.getElementsByClassName("next-condition-img");
let nextConditionText = document.getElementsByClassName("next-condition-text");


// Search Input 
let searchInput = document.getElementById("search");





//Fetch API Data
async function getWeatherData(cityName){
    var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=52fed325574a42be8a9125731242608&q=${cityName}&days=3`, { method : 'GET' //Defult
    })
    weatherData = await weatherResponse.json(); //object علشان يتفهم وترجعهولي في  
    return weatherData ;
}



//start app
async function startApp(city = "cairo"){
    let weatherData =await getWeatherData(city);
    if(!weatherData.error){
        displayTodayData(weatherData);
        displayNextData(weatherData);
    }

}
startApp();





//display today data 
function displayTodayData(data){
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday : "long"});
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month : "long"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src" , data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph+"km/h";
    windDirection = data.current.wind_dir;
}


//display next days data
function displayNextData(data){
    let forecastData = data.forecast.forecastday;
    for(let i = 0 ; i < 2 ; i++){
        let nextDate = new Date(forecastData[i+1].date);        
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday : "long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src" , forecastData[i+1].day.condition.icon);
        nextConditionText[i].innerHTML =  forecastData[i+1].day.condition.text;
    }
}




//search function
searchInput.addEventListener("input" , function(){
    startApp(searchInput.value);
})

