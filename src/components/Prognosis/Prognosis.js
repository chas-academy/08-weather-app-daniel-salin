import React from "react";

import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function Prognosis(props) {
    console.log(props.weather.daily);
    const { data } = props.weather.daily;
    return (
        <div className="jumbotron bg-secondary">
            <h4>{props.weather.daily.summary}</h4>
            <div className="row">
                {data.map(day => {
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
                        <div className="col-3 p-3 m-1 bg-info">
                            <h5>{currentDate}</h5>
                            <h6>{day.summary}</h6>
                            <p>Sunrise: {sunriseTime}</p>
                            <p>Sunset: {sunsetTime}</p>
                            <WeatherIcon size="small" icon={day.icon}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}