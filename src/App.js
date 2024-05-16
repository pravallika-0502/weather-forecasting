import React, { useState } from 'react';
import data from "./weather_data/cities.json"
import './App.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showTemperature, setShowTemperature] = useState(false);
  const [showHumidity, setShowHumidity] = useState(false);
  const [showWindSpeed, setShowWindSpeed] = useState(false);

  const updateWeather = async () => {
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
    const cityData = data.find(object => object.name.toLowerCase() === city.toLowerCase());
    if(!cityData){
      alert('City not found')
      setCity("")
      setWeatherData(null)
      return
    }
    else{
      setWeatherData(cityData);
    }
  }

  return (
    <div className={`main-container ${showTemperature ? 'background-1' : (showHumidity?'background-2':(showWindSpeed?'background-3':'background-4') )}`}>
    
     
      <div className="container">
        <h1>Offline Weather App</h1>
        <div className='container-1'>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
          />
          <button onClick={updateWeather}>Update Weather</button>
        </div>

        {weatherData && (
          <div className="weather-info">
            <p><strong>City:</strong> {weatherData.name}</p>
            <p><strong>Last Updated:</strong> {new Date().toLocaleString()}</p>
            {showTemperature && <p><strong>Temperature:</strong> {Math.round((weatherData.main.temp -273)*100)/100 } °C</p>}
            {showHumidity && <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>}
            {showWindSpeed && <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>}
            <div className="button-container">
              <button onClick={() => setShowTemperature(!showTemperature)}>Toggle Temperature</button>
              <button onClick={() => setShowHumidity(!showHumidity)}>Toggle Humidity</button>
              <button onClick={() => setShowWindSpeed(!showWindSpeed)}>Toggle Wind Speed</button>
            </div>
          </div>
        )}
      </div>    
    </div>
  );
}
export default WeatherApp;