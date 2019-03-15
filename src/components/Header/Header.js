import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchPosition from '../SearchPosition/SearchPosition';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryLocationHits: "",
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
					position,
					loading
				} = this.props;
				const {
					queryLocationHits
				} = this.state;
				return (
		<header>
			<nav style={{position:"relative"}}className="navbar navbar-expand-lg navbar-dark bg-dark">
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
					</ul>
				</div>
				<button style={{position: "absolute", top:"8px", right:"16px"}} className="btn btn-primary btn-sm" onClick={convertUnits}>
								{(unitType==="Metric") ? "To American" : "To Metric"}
				</button>
			</nav>
			<div className="bg-secondary text-light text-center p-1"><h5 className="m-0 p-0">{position.address}</h5></div>
			<SearchPosition searchForPosition={searchForPosition} loading={loading}/>
			
			{(queryLocationHits !== "") 
			? (
		<div className="container">
				<h5>Match found!
					<button  className="btn" data-toggle="collapse" data-target="#search-results" aria-expanded="true" aria-controls="collapseExample">
					<i className="fas fa-lg fa-arrow-alt-circle-down mx-2"></i>
					</button>
				</h5>
<div className="collapse mb-2" id="search-results">
  <div className="card card-body">
  <h5>Did you mean...</h5>
					<ul className="p-0 m-0" style={{listStyleType: "none"}}>
						{queryLocationHits.map(hit => {
							return (
							<li key={hit.address} className="d-inline-flex ml-1 mb-2 badge badge-primary" style={{maxWidth:"250px"}} onClick={(e) =>this.handleClick(e, hit)}> <p className="text-truncate p-1 m-0">{hit.city}?</p></li>
							)
						})}
					</ul>
  </div>
</div>
				</div>
			)
			: null
			}
		</header>
	)
	}
}
