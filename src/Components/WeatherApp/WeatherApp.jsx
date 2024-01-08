/*
What is this program? The provided React component constitutes a simple weather application that enables users to search for current weather conditions in a specified city. The program utilizes the OpenWeatherMap API, managing a state variable (weatherIcon) to dynamically update the displayed weather icon based on the fetched data. Upon a user-triggered search, the component fetches weather details such as humidity, wind speed, temperature, and location from the API. The program employs predefined weather icons for different conditions and defaults to a clear sky icon if the received weather condition code does not match any predefined cases. The user interface includes input fields, icons, and text elements for a comprehensive display of weather-related information, following a structured layout with external styling through a CSS file.
Author: Gabriel Diaconu
Date: January 8 2024
*/ 
import React, { useState } from "react";
import "./WeatherApp.css";
import searchIconImage from "../Assets/search.png"; 
import clearIconImage from "../Assets/clear.png"; 
import cloudIconImage from "../Assets/cloud.png"; 
import drizzleIconImage from "../Assets/drizzle.png"; 
import rainIconImage from "../Assets/rain.png"; 
import snowIconImage from "../Assets/snow.png"; 
import windIconImage from "../Assets/wind.png"; 
import humidityIconImage from "../Assets/humidity.png"; 

const WeatherApp = () => {
    let api_key = "d36e9f935b0e66529e065daca45f23fd";
    
    const [weatherIcon, setWeatherIcon] = useState(cloudIconImage);
    
    const search = async () => {
        const inputElements = document.getElementsByClassName("city-input");
        if (inputElements[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputElements[0].value}&units=Metric&appid=${api_key}`;
    
        let response = await fetch(url);
        let data = await response.json();
        
        const humidityElements = document.getElementsByClassName("humidity-percent");
        const windElements = document.getElementsByClassName("wind-rate");
        const temperatureElements = document.getElementsByClassName("weather-temp");
        const locationElements = document.getElementsByClassName("weather-location");
        
        humidityElements[0].innerHTML = data.main.humidity + " %";
        windElements[0].innerHTML = data.wind.speed + " km/h";
        temperatureElements[0].innerHTML = data.main.temp + " °C";
        locationElements[0].innerHTML = data.name; 
    
        switch (data.weather[0].icon) {
            case "01d":
            case "01n":
                setWeatherIcon(clearIconImage);
                break;
            case "02d":
            case "02n":
                setWeatherIcon(cloudIconImage);
                break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                setWeatherIcon(drizzleIconImage);
                break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                setWeatherIcon(rainIconImage);
                break;
            case "13d":
            case "13n":
                setWeatherIcon(snowIconImage);
                break;
            default:
                setWeatherIcon(clearIconImage);
        }
    }   

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="city-input" placeholder="Search"/>
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={searchIconImage} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon} alt="" />
            </div>
            <div className="weather-temp">
                24°C
            </div>
            <div className="weather-location">
                London
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIconImage} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">
                            64%
                        </div>
                        <div className="text">
                            Humidity
                        </div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIconImage} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">
                            18 km/hr
                        </div>
                        <div className="text">
                            Wind Speed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
