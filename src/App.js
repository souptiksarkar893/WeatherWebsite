import React, { useEffect, useState } from 'react';

const apiKey = 'YOUR-API-KEY';
const cities = ['New York', 'Dubai', 'London', 'Berlin', 'Kutaisi'];

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  async function getWeather(cityInput) {
    if (cityInput.trim() === '') {
      alert('Please enter a city name.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      setWeatherInfo({
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherDescription: data.weather[0].description,
        pressure: data.main.pressure,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    }
  }

  useEffect(() => {
    // Display sticky weather information on page load
    displayStickyWeather();
  }, []);

  async function displayStickyWeather() {
    const stickyWeatherItems = document.getElementById('sticky-weather-items');

    for (const city of cities) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        const item = document.createElement('div');
        item.className = 'sticky-weather-item';
        item.innerHTML = `
            <h5>${city} <i class="fas fa-map-marker-alt"></i></h5>
            <p><i class="fas fa-thermometer-half"></i> Temperature: ${data.main.temp} °C</p>
            <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
            <p><i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s</p>
            <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</p>
            <p><i class="fas fa-tachometer-alt"></i> Pressure: ${data.main.pressure} hPa</p>
        `;

        stickyWeatherItems.appendChild(item);
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    }
  }

  return (
    <div className="container-fluid">
      {/* Main Weather Container */}
      <div id="weather-container" className="container">
        <h2>Weather App</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="city-input"
            placeholder="Enter city name"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => getWeather(document.getElementById('city-input').value)}
              id="submit-btn"
            >
              Submit
            </button>
          </div>
        </div>

        <div id="weather-info">
          {weatherInfo && (
            <div className="weather-info-item">
              <h3>
                {weatherInfo.name}, {weatherInfo.country}
              </h3>
              <p>
                <i className="fas fa-thermometer-half"></i> Temperature: {weatherInfo.temp} °C
              </p>
              <p>
                <i className="fas fa-tint"></i> Humidity: {weatherInfo.humidity}%
              </p>
              <p>
                <i className="fas fa-wind"></i> Wind Speed: {weatherInfo.windSpeed} m/s
              </p>
              <p>
                <i className="fas fa-cloud"></i> Weather: {weatherInfo.weatherDescription}
              </p>
              <p>
                <i className="fas fa-tachometer-alt"></i> Pressure: {weatherInfo.pressure} hPa
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Weather Section */}
      <div className="sticky-weather">
        <div id="sticky-weather-items"></div>
      </div>
    </div>
  );
}

export default App;
