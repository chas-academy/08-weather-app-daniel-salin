import React from "react";
import { Switch, Route } from "react-router-dom";

import TodaysWeather from "../TodaysWeather/TodaysWeather";
import Prognosis from "../Prognosis/Prognosis";

export default function Main() {
    return (
        <main>
            <Route exact path="/" component={ TodaysWeather } />
            <Route path="/prognosis" component={ Prognosis } />
        </main>
    )
}