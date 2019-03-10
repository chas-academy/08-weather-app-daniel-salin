import React from "react";
import { Switch, Route } from "react-router-dom";

import TodaysWeather from "../TodaysWeather/TodaysWeather";
import Prognosis from "../Prognosis/Prognosis";

// HOC
import withApiCalls from "../../HOC/withApiCalls";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: ""
        }
    }
      
    render() {
        const {position, weather} = this.props;
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
    
            return (
                <main>
                    <div className="jumbotron"> 
                        <h1>{weather.currently.summary}</h1>
                    </div>
                    <div className="container">
                        <Route exact path="/" component={ TodaysWeather } />
                        <Route path="/prognosis" component={ Prognosis } />
                    </div>
            </main>
        )}
    }
}

export default withApiCalls(Main);