import React from "react";

import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function Prognosis(props) {
    console.log(props.weather.daily);
    const { data } = props.weather.daily;
    return (
        <div className="container p-3 bg-secondary">
            <h4 className="container p-2 bg-warning text-center">{props.weather.daily.summary}</h4>
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
                        <div className="col-lg-3 col-md-6 col-sm-12"> 
                        <div style={{minHeight:"270px"}} className="card w-100 m-1 bg-info p-2">
                            <h5>{currentDate}</h5>
                            <p>{day.summary}</p>
                            <p>Sunrise: {sunriseTime}</p>
                            <p>Sunset: {sunsetTime}</p>
                            <WeatherIcon size="small" icon={day.icon}/>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
