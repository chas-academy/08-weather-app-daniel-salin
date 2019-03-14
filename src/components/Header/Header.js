import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchPosition from '../SearchPosition/SearchPosition';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryLocationHits: "",
			location: ""
		}
		this.handleClick = this.handleClick.bind(this);
	}

		componentDidUpdate(prevProps) {
			if (this.props.queryLocationHits !== prevProps.queryLocationHits) {
				this.setState({
					...this.state,
					queryLocationHits: this.props.queryLocationHits
				});
			}
		}
		handleClick = (e, hit) => {
			const { getWeather } = this.props;
			e.preventDefault();

			getWeather("units=si", hit);
			getWeather("units=us", hit);
		}

		render() {
				const {
					convertUnits,
					unitType,
					searchForPosition,
					position
				} = this.props;
				const {
					queryLocationHits
				} = this.state;
				return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item px-3 pt-2">
							<NavLink to="/today" className="text-light" activeStyle={{ fontWeight: "bold", color: "red"}}>Prognosis- today</NavLink>
						</li>
						<li className="nav-item px-3 pt-2">
							<NavLink to="/week" className="text-light" activeStyle={{ fontWeight: "bold", color: "red"}}>Prognosis- week</NavLink>
						</li>
						<li className="nav-item px-3">
							<button className="btn btn-primary btn-small" onClick={convertUnits}>
								{(unitType==="Metric") ? "Display American" : "Display Metric"}
							</button>
						</li>
					</ul>
				</div>
				<div className="text-light align-right">{position.address}</div>
			</nav>
			<SearchPosition searchForPosition={searchForPosition}/>
			{(queryLocationHits !== "") 
			? (
				<div className="container">
					<h5>Did you mean...</h5>
					<ul style={{listStyleType: "none"}}>
						{queryLocationHits.map(hit => {
							return (
							<li className="d-inline-flex ml-2 badge badge-primary" onClick={(e) =>this.handleClick(e, hit)}> {hit.city}?</li>
							)
						})}
					</ul>
				</div>
			)
			: null
			}
		</header>
	)
	}
}
