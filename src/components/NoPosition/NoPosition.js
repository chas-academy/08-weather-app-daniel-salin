import React from 'react';

import './NoPosition.css';

import SearchPosition from "../SearchPosition/SearchPosition";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default class NoPosition extends React.Component {
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
      const { searchForPosition, geoLocation, loading, queryLocationHits } = this.props;
    return (
      <div className="jumbotron pt-3 bg-danger text-light">
               <WeatherIcon size="small" />
             <h1>Welcome to my weather app!</h1>
             <p>So... It turns out you either turned off the location-service or your browser doesn't support this feature. 
               No worries! Just use the search feature to find your position, or try locating yourself again. </p>
     <SearchPosition 
				searchForPosition={searchForPosition} 
				geoLocation={geoLocation}
				loading={loading}/>
				{(queryLocationHits !== "") 
				? (
					<div className="container">
						<h5>Match found!
						<button className="btn" style={{background: "none"}}data-toggle="collapse" data-target="#search-results" aria-expanded="true" aria-controls="collapseExample">
						<i className="fas fa-lg fa-arrow-alt-circle-down mx-2"></i>
						</button>
						</h5>
					<div className="collapse mb-2" id="search-results">
  					<div className="card card-body text-dark px-1">
  						<h5>Did you mean...</h5>
							<ul className="p-0 m-0">
							{queryLocationHits.map(hit => {
              	return (
								<li key={hit.city} className="d-inline-flex ml-1 mb-2 badge badge-primary match-badge" onClick={(e) =>this.handleClick(e, hit)}> 
									<p className="text-truncate p-1 m-0">{hit.city}?</p>
								</li>
								)
							})}
							</ul>
  					</div>
					</div>
				</div>
        
			)
			: null
			}
    </div>
  )
    }
}
