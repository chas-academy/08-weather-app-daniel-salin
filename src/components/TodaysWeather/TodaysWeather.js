import React from "react";

import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function TodaysWeather(props) {
    const { weather, unitType } = props;

    return (
        <div className="container p-3 bg-secondary text-light">
             <h4 className="container p-2 bg-warning text-dark text-center">{weather.summary}</h4>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col">Hour</th>
                        <th scope="col">Weather</th>
                        <th scope="col">Description</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Apparent temperature</th>
                        <th scope="col">Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    { weather.data.map(hour => {
                        if (weather.data.indexOf(hour)%3 === 0 && weather.data.indexOf(hour) < 25) {
                            return (
                            <tr className="text-center">
                                <td >
                                    <div className="row">
                                <span className="mx-auto">{new Date(hour.time*1000).toLocaleTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                    <div className="row">
                                    <span className="mx-auto">{new Date(hour.time*1000).toLocaleDateString(navigator.language,{ weekday: 'short'})}</span>
                                    </div>
                                </td>
                                <td><WeatherIcon size="small" icon={hour.icon} /></td>
                                <td>{hour.summary}</td>
                                <td>{hour.temperature}{(unitType==="Metric")? "°C" : "°F"}</td>
                                <td>{hour.apparentTemperature}{(unitType==="Metric")? "°C" : "°F"}</td>
                                <td>{(hour.humidity*100).toFixed(0)}%</td>
                            </tr>);
                        } else {
                            return ""
                        }
                    })
                    }
                </tbody>
            </table>
        </div>
    )
    
}