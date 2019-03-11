import React from "react";
import {  Route } from "react-router-dom";

import TodaysWeather from "../TodaysWeather/TodaysWeather";
import Prognosis from "../Prognosis/Prognosis";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

// HOC
import withApiCalls from "../../HOC/withApiCalls";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: "",
            temperatureUnit: "celsius"
        }
    }

    convertTemperature = () => {
        (this.state.temperatureUnit === "celsius") ? 
        this.setState({...this.state, temperatureUnit: "farenheit"})
        :
        this.setState({...this.state, temperatureUnit: "celsius"})
    }

    render() {
        const {position, weather} = this.props;
        const { temperatureUnit } = this.state;
        if(!window.navigator) {
            return (
                <div className="container bg-danger text-light">
                    <h1>It appears your browser does not support the Geolocation-API</h1>
                </div>
            )
        } else if(position === "") {
             return ( 
                 <div className="container bg-primary text-light">
                 <h1>LOADING ART GOES HERE</h1>
                     <p>Please hold while we're acquiring your position</p>
                 </div>
                )
            } else if(position === "NA") {
                return (
                    <div className="container bg-danger text-light">
                    <h1>FAILED TO RETRIEVE USER LOCATION ART GOES HERE</h1>
                    <p>We're having trouble locating your current position. This might have to do with your browser settings or perhaps you're not interested in the weather where you are.</p>
                </div>
            )
        } else if(weather === "") {
            return(
                <div className="container bg-primary text-light">
                    <h1>LOADING WEATHER</h1>
                </div>
            )
         } else {
             const { currently } = weather;
             
            return (
                <main>
                    <div className="container p-3 bg-dark text-light"> 
                    <h2 className="text-center">Current Weather</h2>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <ul className="text-center" style={{listStyleType:"none"}}>
                                <li><button className="btn btn-sm" onClick={this.convertTemperature}>Switch temperature unit</button></li>
                                <li>Summary: {currently.summary}</li>
                                {temperatureUnit === "celsius" ? <li>Temperature: {currently.temperature}°C</li> : <li>Temperature: {currently.temperature* 1.8 + 32}°F</li>}
                                <li>Wind Speed: {currently.windSpeed} m/s</li>
                                <li>Humidity: {currently.humidity}</li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <WeatherIcon size="large" icon={currently.icon}/>
                        </div>
                    </div>
                    </div>
                    <div>
                        <Route exact path="/" component={ TodaysWeather } />
                        <Route path="/prognosis"
                            render={() => <Prognosis weather={weather}/>}
                            />
                    </div>
            </main>
        )}
    }
}

export default withApiCalls(Main);