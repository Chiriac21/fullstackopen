import { useState, useEffect } from 'react'
import weatherService from "../services/weatherService";

const Countries = ({countries, setCountries, countrySearch}) => {
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
        if(countries.length === 1)
        {
            const country = countries[0]
            weatherService
            .getWeatherForCountry(country)
            .then(resp => setWeather(resp))
        }
    }, [countries])
    

    const showCountryDetails = (countryToShow) => {
        setCountries([countryToShow]);
    }

    if(countries.length > 10)
    {
        return (
        <>
            <div>
                Too many matches, specify enother filter
            </div>
        </>
        )
    }

    if (countries.length === 1) {
        const country = countries[0];
        return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h1>Languages</h1>
            <ul>
            {Object.values(country.languages).map((value, index) => (
                <li key={index}>{value}</li>
            ))}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} />

            {weather && (
            <>
                <h1>Weather in {country.capital}</h1>
                <p>Temperature: {weather.current.temp_c} °C</p>
                <img src={weather.current.condition.icon}/>
                <p>Wind: {weather.current.wind_kph} km/h</p>
            </>
            )}
        </div>
        );
    }

    return(
        <>
        <div>
         {countries.map((country) => 
         <p 
            key={country.name.common}>{country.name.common} <button onClick={() => showCountryDetails(country)}>Show</button>
         </p>)}
        </div>
        </>
    )
}

export default Countries;