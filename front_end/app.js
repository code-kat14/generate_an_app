const apiKey = '30e20b2bf790aec88f1787f1fe9f1028'; // Replace with your OpenWeatherMap API key  // 30e20b2bf790aec88f1787f1fe9f1028
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elements
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDetails = document.getElementById('weather-details');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Fetch weather data
const fetchWeather = async (city) => {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`; // Units in metric (Celsius)

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Update UI with weather data
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      weatherDescription.textContent = data.weather[0].description;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

      weatherDetails.style.display = 'block';  // Show weather details
      errorMessage.style.display = 'none';    // Hide error message
    } else {
      throw new Error('City not found');
    }
  } catch (error) {
    errorMessage.style.display = 'block';  // Show error message
    weatherDetails.style.display = 'none'; // Hide weather details
  }
};

// Event listener for the button
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Optional: Allow user to press "Enter" to fetch weather
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeatherBtn.click();
  }
});
