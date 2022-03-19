import {useState,useEffect} from 'react'
import axios from 'axios'

const Weather = ({lat, lon}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
             .then(response => setWeather(response.data)) 
    },[])
    
    if (!weather) return null;

    return (
        <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
            <p>{weather.weather[0].description}</p>
            <p>The temperature now is {weather.main.temp} degrees Celsius, but it feels like {weather.main.feels_like}</p>
            <p>Wind speed is {weather.wind.speed} km/h</p>
            <p>The pressure is {weather.main.pressure} hPa</p>
        </div>
    )
}

export default Weather