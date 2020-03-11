# Sounds of Weather

### Project Plan
The aim of this project is to create an application that will fetch weather data and use the information to produce sounds using Web Audio API. The user will be able to tell the current weather conditions by listening to the soundscapes being produced.

### Latest
This app currently produces an arpeggio sound when it is raining. It also changes the musical key to minor or major depending on cloud coverage.

### Install
Notice! The app defaults to using sample weather data from `sample-data.json`. To fetch real-time data you need to register to Open Weather API, get your own API Key and insert this key into the API_KEY variable in `fetch-weather.js`

Install with `npm install`

Run app with `npm run dev`

### Technologies
- Javascript
- Web Audio API / Tone.js
- Open Weather API