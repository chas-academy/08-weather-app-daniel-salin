import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function Current(props) {
    console.log(props); 
    const { weather, unitType } = props;
    return (
        <div className="container p-3 bg-dark text-light"> 
        <h2 className="text-center">Current Weather</h2>
        <div className="row">
            <div className="col-md-6 col-sm-12">
                <ul className="text-center" style={{listStyleType:"none"}}>
                    <li>Summary: {weather.summary}</li>
                    <li>Temperature: {weather.temperature} {(unitType==="Metric")? "°C" : "°F"}</li> 
                    <li>Wind Speed: {weather.windSpeed} {(unitType==="Metric")? "m/s" : "mph"}</li>
                    <li>Humidity: {(weather.humidity*100).toFixed(0)}%</li>
                </ul>
            </div>
            <div className="col-md-6 col-sm-12">
                <WeatherIcon size="large" icon={weather.icon}/>
            </div>
        </div>
        </div>
    )
}