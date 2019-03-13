import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function Current(props) { 
    const { weather, unitType } = props;
    return (
        <div className="container bg-dark text-light"> 
            <div className="row">
                <div className="col-md-4 text-center" style={{fontSize:"3em"}}>
                    {weather.temperature} {(unitType==="Metric")? "°C" : "°F"}
                </div>
            <div className="col-md-4 col-sm-12">
                <ul className="p-3 text-center" style={{listStyleType:"none"}}>
                    <li><h4>{weather.summary}</h4></li>
                    <li>Wind Speed: {weather.windSpeed} {(unitType==="Metric")? "m/s" : "mph"}</li>
                    <li>Humidity: {(weather.humidity*100).toFixed(0)}%</li>
                </ul>
            </div>
            <div className="col-md-4 col-sm-12">
                <WeatherIcon size="large" icon={weather.icon}/>
            </div>
        </div>
        </div>
    )
}