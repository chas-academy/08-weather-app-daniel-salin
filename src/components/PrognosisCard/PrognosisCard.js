import React from 'react'
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function PrognosisCard(props) {
  const { day, sunriseTime, sunsetTime, unitType, currentDate} = props;
  const cardStyle = {
    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(63,140,205,1) 0%, rgba(0,212,255,1) 100%)"
  }

  return (
    <div key ={day.time.toString()} className="col-lg-3 col-md-6 col-sm-12"> 
    <div style={{minHeight:"410px"}} className="card w-100 m-1 pt-3">
      <WeatherIcon size="large" icon={day.icon}/>
      <div style={cardStyle} className="card-body m-0">
      <h5>{currentDate}</h5>
        <p><em>{day.summary}</em></p>
        <p><span style={{fontWeight:"bold"}}>Humidity: </span>{(day.humidity*100).toFixed(0)}%</p>
        <p><span style={{fontWeight:"bold"}}>Temperature: </span>{day.temperatureHigh}{(unitType==="Metric")? "°C" : "°F"}</p>
        <p><span style={{fontWeight:"bold"}}>Temperature: </span>{day.temperatureLow}{(unitType==="Metric")? "°C" : "°F"}</p>
        <p><span style={{fontWeight:"bold"}}>Sunrise: </span>{sunriseTime}</p>
        <p><span style={{fontWeight:"bold"}}>Sunset: </span>{sunsetTime}</p>
      </div>
    </div>
  </div>
  )
}
