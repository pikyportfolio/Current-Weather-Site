window.addEventListener('load', ()=> {
let long, lat, day;
let temperatureDegree = document.querySelector(".temperature-degree");
let realLocation = document.querySelector(".actual-location h1");
let lastUpdate = document.querySelector(".actual-location h3")
let tempDescription = document.querySelector(".temperature-description");
let temperatureSection = document.querySelector(".degree-section");
let rainfallMM = document.querySelector(".rain span");
let humidityPercentage = document.querySelector(".humidity span");
let windMph = document.querySelector(".wind span");
const temperatureSpan = document.querySelector(".degree-section span")

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const api =`http://api.weatherapi.com/v1/current.json?key=164317725b714d98952194321202406&q=${lat},${long}`;

        //Convert json to use data
        fetch(api)
        .then(weatherdata =>{
            return weatherdata.json();
        })
        .then(jsonweatherdata =>{
            console.log(jsonweatherdata);
            
            const {temp_c,temp_f,is_day,last_updated,wind_mph,humidity,percip_mm} = jsonweatherdata.current;
            const {text,icon} =jsonweatherdata.current.condition;
            const {name,country} = jsonweatherdata.location;

            //Connect API data 
            temperatureDegree.textContent = temp_c;
            tempDescription.textContent = text;
            realLocation.textContent = `${name},${country}`;
            lastUpdate.textContent = last_updated;
            humidityPercentage.textContent = humidity;
            windMph.textContent = wind_mph;
            rainfallMM.textContent = percip_mm;
            document.getElementById("icons").src = `https:${icon}`;
            day = is_day;
            
            //Change between F and C degrees
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent ==="C"){
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temp_f;
                    }else {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temp_c;
                    }
                });

            //Change background style at night
            if(day != 1){
                document.body.style.background = "linear-gradient(rgb(90,90,151),rgb(49,49,99),rgb(15,15,65))";
                document.body.style.color= "whitesmoke";}

        });
    });
    }
});
    

    
