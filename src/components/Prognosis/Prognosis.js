import React from "react";

export default function Prognosis(props) {
    console.log(props.weather.daily);
    const { data } = props.weather.daily;
    return (
        <div className="jumbotron bg-secondary">
            <h4>{props.weather.daily.summary}</h4>
            <div className="row">
                {data.map(day => {
                    const dayArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                    const currentDay = new Date(day.time*1000).getDay();
                    return (
                        <div className="col-3 p-3 m-1 bg-info">
                            <h5>{dayArray[currentDay]}</h5>
                            <p>{day.summary}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}