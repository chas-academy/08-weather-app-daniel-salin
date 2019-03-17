import React from "react";

import CurrentWeather from "../CurrentWeather/CurrentWeather";
import PrognosisCard from "../PrognosisCard/PrognosisCard";

export default function Prognosis(props) {
	const { daily, currently } = props.weather;
  const  { unitType, prognosisType } = props;
  
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
         
          if(daily.data.indexOf(day) < 5 && prognosisType === "fiveDay") {
          return (
            <PrognosisCard key={day.time} day={day} currentDate={currentDate} sunsetTime={sunsetTime} sunriseTime={sunriseTime} unitType={unitType}/>
            )} else if (prognosisType === "week") {
              return (
                <PrognosisCard key={day.time} day={day} currentDate={currentDate} sunsetTime={sunsetTime} sunriseTime={sunriseTime} unitType={unitType}/>
            )
          }
        }  
			)}
			</div>
		</div>
		</section>
	)
}
