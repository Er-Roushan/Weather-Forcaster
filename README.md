# Weather-Forecast
https://ankushjagga.github.io/Weather-Forecast/
## Features 
- It auto-displays the weather of the device's current location. This is achieved using navigator geolocation property which helps to get latitude and longitude of the user's position.
- It lets user search weather of over 200,000 cities.
- It also loads a background related to the weather conditions of the city searched.

### CAUTION : 
Make sure that your device allows location sharing to your browser as well as your browser allows location sharing to the website. Location related settings 
could prevent location auto-detection and display "No weather found.". However, manually searching for a valid city name always works.

#### API's used
- OpenWeatherMap's Current weather data API to get realtime weather info. (Allows 60 calls/min and 1,000,000 calls/month)
- OpenCage Geocoding API to convert latitude and longitude to text. (Allows 1 calls/sec and 2,500 calls/day)
