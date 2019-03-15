import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function Current(props) { 
    const { weather, unitType } = props;
    return (  
    	<div className="m-0 p-2 row text-center bg-primary text-light">
    	  <div className="col-sm-3 col-xs-3 text-center" style={{fontSize:"2em", alignSelf:"center"}}>
    	      {weather.temperature} {(unitType==="Metric")? "°C" : "°F"}
    	  </div>
    	  <div className="col-sm-3 col-xs-3" style={{fontSize:"2em", alignSelf:"center"}}>
    	      <WeatherIcon desc={weather.summary} size="large" icon={weather.icon}/>
    		</div>
    	  <div className="col-sm-5 text-center" style={{alignSelf:"center"}}>
    	    <ul className="text-left" style={{listStyleType:"none"}}>
    	        <li>Wind Speed: {weather.windSpeed} {(unitType==="Metric")? "m/s" : "mph"}</li>
    	        <li>Humidity: {(weather.humidity*100).toFixed(0)}%</li>
    	    </ul>
    	  </div>
    	</div>

    )
}