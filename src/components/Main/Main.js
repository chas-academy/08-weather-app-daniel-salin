import React from "react";
import {  Switch, Route } from "react-router-dom";

import PrognosisDaily from "../PrognosisDaily/PrognosisDaily";
import Prognosis from "../Prognosis/Prognosis";

class Main extends React.Component {
	render() {
		const { weather, unitType } = this.props;
			return (
				<main className="mb-2">
					<Switch >
						<Route exact path="/" render={() => <PrognosisDaily unitType={unitType} weather={weather}/>}/>
						<Route path="/today" render={() => <PrognosisDaily unitType={unitType} weather={weather}/>}/>
						<Route path="/five" render={() => <Prognosis prognosisType={"fiveDay"} unitType={unitType} weather={weather}/>}/>
						<Route path="/week" render={() => <Prognosis prognosisType={"week"} unitType={unitType} weather={weather}/>}/>
					</Switch>
				</main>
		)
	}
}

export default Main;