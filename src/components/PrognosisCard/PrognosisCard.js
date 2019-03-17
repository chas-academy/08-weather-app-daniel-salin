import React from 'react'
import "./PrognosisCard.css"
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function PrognosisCard(props) {
  const { day, sunriseTime, sunsetTime, unitType, currentDate} = props;

  return (
    <div key ={day.time.toString()} className="col-lg-3 col-md-6 col-sm-12"> 
    <div className="card card-custom w-100 m-1 pt-3">
      <WeatherIcon size="large" icon={day.icon}/>
      <div className="card-body card-body-custom m-0">
      <h5>{currentDate}</h5>
        <p><em>{day.summary}</em></p>
        <p><span>Humidity: </span>{(day.humidity*100).toFixed(0)}%</p>
        <p><span>Temperature(high): </span>{day.temperatureHigh}{(unitType==="Metric")? "°C" : "°F"}</p>
        <p><span>Temperature(low): </span>{day.temperatureLow}{(unitType==="Metric")? "°C" : "°F"}</p>
        <p><span>Sunrise: </span>{sunriseTime}</p>
        <p><span>Sunset: </span>{sunsetTime}</p>
      </div>
    </div>
  </div>
  )
}
