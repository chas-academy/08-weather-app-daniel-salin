import React from "react";
import "./CurrentWeather.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function Current(props) { 
    const { weather, unitType } = props;
    return (  
    	<div className="m-0 p-2 row text-center bg-primary text-light">
    	  <div className="col-sm-4 col-xs-4 text-center">
    	      <p className="info-bit align-middle">{weather.temperature} {(unitType==="Metric")? "°C" : "°F"}</p>
    	  </div>
    	  <div className="col-sm-4 col-xs-4">
    	      <WeatherIcon desc={weather.summary} size="large" icon={weather.icon}/>
    		</div>
    	  <div className="col-sm-4 col-xs-12 text-center">
    	    <ul className="text-left">
    	        <li><span>Wind Speed:</span> {weather.windSpeed} {(unitType==="Metric")? "m/s" : "mph"}</li>
    	        <li><span>Humidity:</span> {(weather.humidity*100).toFixed(0)}%</li>
    	    </ul>
    	  </div>
    	</div>

    )
}