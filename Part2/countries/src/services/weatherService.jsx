import axios from 'axios'
const baseUrl = 'https://api.weatherapi.com/v1'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeatherForCountry = (country) => {
    const req = axios.get(`${baseUrl}/current.json?key=${api_key}&q=${country.capital}&aqi=no`);
    return req.then(response => response.data)
}

export default {getWeatherForCountry}