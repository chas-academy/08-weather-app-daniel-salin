import React from "react";
import {  Switch, Route } from "react-router-dom";

import PrognosisDaily from "../PrognosisDaily/PrognosisDaily";
import PrognosisWeekly from "../PrognosisWeekly/PrognosisWeekly";

class Main extends React.Component {
	render() {
		const { weather, unitType } = this.props;
			return (
				<main className="mb-2">
					<Switch >
						<Route exact path="/" render={() => <PrognosisDaily unitType={unitType} weather={weather}/>}/>
						<Route path="/today" render={() => <PrognosisDaily unitType={unitType} weather={weather}/>}/>
						<Route path="/week" render={() => <PrognosisWeekly unitType={unitType} weather={weather}/>}/>
					</Switch>
				</main>
		)
	}
}

export default Main;