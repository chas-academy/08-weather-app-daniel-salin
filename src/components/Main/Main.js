import React from "react";
import {  Switch, Route } from "react-router-dom";

import TodaysWeather from "../TodaysWeather/TodaysWeather";
import Prognosis from "../Prognosis/Prognosis";
import Current from "../Current/Current";

class Main extends React.Component {

    render() {
        const { weather, unitType } = this.props;
            return (
                <main className="row">
                    <Switch >
                        <Route exact path="/current" render={() => <Current unitType={unitType} weather={weather.currently}/>}/>
                        <Route path="/week" render={() => <Prognosis unitType={unitType} weather={weather.daily}/>}/>
                        <Route path="/today" render={() => <TodaysWeather unitType={unitType} weather={weather.hourly}/>}/>
                    </Switch>
            </main>
        )
    }
}

export default Main;