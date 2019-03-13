import React from "react";

import WeatherIcon from "../WeatherIcon/WeatherIcon";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

export default function PrognosisWeekly(props) {
    const { daily, currently } = props.weather;
    const  { unitType } = props;
    return (
        <section>
        <CurrentWeather unitType={unitType} weather={currently}/>    
        <div className="bg-secondary">
            <h4 className="p-2 bg-warning text-center">{daily.summary}</h4>
            <div className="row p-3">
                {daily.data.map(day => {
                    const currentDate = new Date(day.time*1000).toLocaleDateString(navigator.language,{
                        weekday: 'long',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    const sunriseTime = new Date(day.sunriseTime*1000).toLocaleTimeString(navigator.language,{
                        hour: '2-digit',
                        minute:'2-digit'
                    });
                    const sunsetTime = new Date(day.sunsetTime*1000).toLocaleTimeString(navigator.language,{
                        hour: '2-digit',
                        minute:'2-digit'
                    });
                    return (
                        <div key ={day.time.toString()} className="col-lg-3 col-md-6 col-sm-12"> 
                        <div style={{minHeight:"410px"}} className="card w-100 m-1 bg-info p-2">
                            <h5>{currentDate}</h5>
                            <p>{day.summary}</p>
                            <p>Humidity: {(day.humidity*100).toFixed(0)}%</p>
                            <p>Temperature High: {day.temperatureHigh}{(unitType==="Metric")? "°C" : "°F"}</p>
                            <p>Temperature Low: {day.temperatureLow}{(unitType==="Metric")? "°C" : "°F"}</p>
                            <p>Sunrise: {sunriseTime}</p>
                            <p>Sunset: {sunsetTime}</p>
                            <WeatherIcon size="small" icon={day.icon}/>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </section>
    )
}
