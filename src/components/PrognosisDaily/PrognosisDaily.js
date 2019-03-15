import React from "react";

import WeatherIcon from "../WeatherIcon/WeatherIcon";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

export default function PrognosisDaily(props) {
	const { weather, unitType } = props;

	return (
		<section>
			<CurrentWeather unitType={unitType} weather={weather.currently}/>
					<h5 className="p-2 m-0 bg-warning text-dark text-center">{weather.hourly.summary}</h5>
				<div className="p-2 bg-secondary text-light mx-auto" style={{overflowX:"scroll"}}>
					<table className="table">
						<thead>
							<tr className="text-center">
								<th>Time</th>
								<th>Desc.</th>
								<th>Temperature</th>
								<th>Feels</th>
								<th>Humidity</th>
								<th>Percip</th>
								<th>Wind</th>
							</tr>
						</thead>
						<tbody>
							{ weather.hourly.data.map(hour => {
								if (weather.hourly.data.indexOf(hour)%3 === 0 && weather.hourly.data.indexOf(hour) < 25) {
									return (
									<tr key={hour.time} className="text-center">
										<td >
											<div className="row">
										<span className="mx-auto">{new Date(hour.time*1000).toLocaleTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'})}</span>
											</div>
											<div className="row">
											<span className="mx-auto">{new Date(hour.time*1000).toLocaleDateString(navigator.language,{ weekday: 'short'})}</span>
											</div>
										</td>
										<td><WeatherIcon desc={hour.summary} size="small" icon={hour.icon} /></td>
										<td>{hour.temperature}{(unitType==="Metric")? "°C" : "°F"}</td>
										<td>{hour.apparentTemperature}{(unitType==="Metric")? "°C" : "°F"}</td>
										<td>{(hour.humidity*100).toFixed(0)}%</td>
										<td>{(hour.precipProbability*100).toFixed(0)}%</td>
										<td>{hour.windSpeed} {(unitType==="Metric")? "m/s" : "mph"}</td>
									</tr>);
								} else {
										return null;
								}
							})}
						</tbody>
				</table>
		</div>
		</section>
	)
}
