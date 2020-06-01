

window.addEventListener('load', () => {
    let lat;
    let long;

    let temperatureDescription = document.querySelector(".current .weather");
    let temperatureDegree = document.querySelector(".current .temp");
    let aq = document.querySelector(".current .air");
    let loc = document.querySelector(".location .city");
    let day = document.querySelector(".location .date");
    let precipind = document.querySelector(".current .hi-low");
    let pressureind = document.querySelector(".current .press");
    let dawn = document.querySelector(".current .sunrise");
    let hum = document.querySelector(".current .humid");
    let temperatureSpan = document.querySelector('.current .unit');
    let timer = document.querySelector(".location .time");






    const api = {
        key: "ccd598c2ef2448598de8e5f597b59f2f",
        baseURL: "https://api.weatherbit.io/v2.0/current",
    }

    const searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', setQuery);



    function setQuery(evt) {
        if (evt.keyCode == 13) {
            getResults(searchbox.value);
        }
    }

    function getResults(city) {
        fetch(`${api.baseURL}?city=${city}&key=${api.key}`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)
                const { temp, app_temp, aqi, city_name, clouds, country_code, wind_spd, precip, pres, rh, timezone, ts } = data.data[0];
                const { description, icon } = data.data[0].weather;
                let fahren = (temp * (9 / 5)) + 32;
                let tm = timezone;


                //Set DOM elements from API
                temperatureDegree.textContent = temp + '°C' + " / " + Math.round(fahren) + '°F';
                aq.textContent = "Air Quality Index: " + aqi;
                loc.textContent = city_name + ", " + country_code;
                temperatureDescription.textContent = description;
                precipind.textContent = "Precipitation: " + precip + " mm/hr";
                pressureind.textContent = "Pressure: " + pres + " mb";
                dawn.textContent = "Wind Speed: " + wind_spd + " m/s";
                hum.textContent = "Relative Humidity: " + rh + " %";

                //const ms = tm *1000; 

                const dt = new Date().toLocaleString('en-US', { timeZone: tm });
                let date = document.querySelector('.location .date');
                date.innerText = dt;









            });
    }









});
