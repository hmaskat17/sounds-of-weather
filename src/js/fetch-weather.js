const API_KEY = 'Enter your unique key here';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const CITY_ID = '633680'; // Turku
const UNITS = 'metric';
const URL = API_URL + CITY_ID + '&units=' + UNITS + '&appid=' + API_KEY;

const SAMPLE = '../sample-data.json';

const currentWeather = async () => {
    let data = await getData();
    return data;
}

async function getData() {
    let response = await fetch(SAMPLE);
    let data = await response.json();
    return data;
};

export { currentWeather };