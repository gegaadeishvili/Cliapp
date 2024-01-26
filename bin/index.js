#!/usr/bin/env node
const axios = require('axios');

if (process.argv.length !== 3) {
  console.log('Usage: node weather.js <city>');
  process.exit(1);
}

const city = process.argv[2];
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=6d210d800ff040bc960184527242301&q=${city}`;

axios.get(apiUrl)
  .then(response => {
    const data = response.data;
    const { location, current } = data;
    console.log(`Weather in ${location.name}, ${location.country}:`);
    console.log(`Temperature: ${current.temp_c}°C`);
    console.log(`Condition: ${current.condition.text}`);
    console.log(`Humidity: ${current.humidity}%`);
  })
  .catch(error => {
    if (error.response) {
      console.error(`Error: ${error.response.data.error.message}`);
    } else {
      console.error('Error fetching weather data:', error.message);
    }
  });
