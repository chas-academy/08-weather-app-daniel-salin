import React from "react";

const withApiCalls = (WrappedComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				queryLocationHits: "",
				position: "",
				weatherSI: "",
				weatherUS: "",
				loading: false
			}
			this.geoLocation = this.geoLocation.bind(this);
			this.getWeather = this.getWeather.bind(this);
			this.searchForPosition = this.searchForPosition.bind(this);
		}
		componentDidMount() {
			this.geoLocation();
		}

		/* 
		-------------------------------------- 
		GEOLOCATION API
		-------------------------------------- 
		*/

		geoLocation() {
			const options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};
			if (window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(position => {
					let lat = position.coords.latitude.toFixed(3);
					let lng = position.coords.longitude.toFixed(3);
					this.convertCoords(lat, lng);
					let fetchedPosition = {
						latitude: lat,
						longitude: lng
					}
					this.setState({
						...this.state,
						position: fetchedPosition
					});
					this.getWeather("units=si", null);
					this.getWeather("units=us", null);
				}, (error) => {
					this.setState({
						...this.state,
						position: "NA"
					})
				}, options)
			}
		}

		/* 
		-------------------------------------- 
		OPENCAGE API - USER QUERY LOCATION
		-------------------------------------- 
		*/

		convertCoords = (lat, lng) => {
			let query = `${lat},${lng}`;
			const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.REACT_APP_OPENCAGE_KEY}&pretty=1`;
			fetch(url).then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error('Connection to OpenCage API failed');
					}
				})
				.then(data => {
					this.setState({
						...this.state,
						position: {
							...this.state.position,
							address: data.results[0].formatted
						}
					})
					return true
				})
				.catch(error => console.log("There was an error: ", error.message));

		}

		searchForPosition = (searchTerm, coords) => {
			let query;
			(searchTerm === null) ? query = coords: query = searchTerm
			const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.REACT_APP_OPENCAGE_KEY}&pretty=1`
			fetch(url).then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error('Connection to OpenCage API failed');
					}
				})
				.then(data => {
					if (searchTerm === null && data.results.length > 1) {
						this.setState({
							...this.state,
							position: data.results.formatted
						});
					} else {
						this.handleQueryPositions(data.results);
						this.setState({
							...this.state,
							queryPosition: data.results[0].components
						});
					}
				})
				.catch(error => console.log("There was an error: ", error.message));
		}

		handleQueryPositions = (results) => {
			let matchArray = [];
			results.map(city => {
				let hit = {
					city: city.formatted,
					geo: {
						latitude: city.geometry.lat,
						longitude: city.geometry.lng
					}
				}
				return matchArray.push(hit);
			});
			this.setState({
				...this.state,
				queryLocationHits: matchArray
			})
		};

		/* 
		-------------------------------------- 
		DARKSKY API
		-------------------------------------- 
		*/

		getWeather = (selectedUnit, queryPosition) => {
			this.setState({
				...this.state,
				loading: true
			});
			// API call options
			const devCorsProxy = "https://cors-anywhere.herokuapp.com";
			const baseUrl = "https://api.darksky.net";
			const parameters = "forecast";
			const darkskyApiKey = process.env.REACT_APP_DARKSKY_KEY;
			const units = selectedUnit;
			let latitude;
			let longitude;
			if (queryPosition === null) {
				latitude = this.state.position.latitude;
				longitude = this.state.position.longitude;
			} else {
				latitude = queryPosition.geo.latitude;
				longitude = queryPosition.geo.longitude;
				this.setState({
					...this.state,
					position: {
						...this.state.position,
						address: queryPosition.city
					}
				});
			}

			//fetch data
			const url = `${devCorsProxy}/${baseUrl}/${parameters}/${darkskyApiKey}/${latitude},${longitude}?${units}`;
			console.log(url);
			fetch(url).then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error('Connection to DarkSky API failed');
					}
				})
				.then(data => {
					(units === "units=si") ?
					this.setState({
						...this.state,
						weatherSI: data,
						loading: "complete"
					}): this.setState({
						...this.state,
						weatherUS: data,
						loading: "complete"
					})
				})
				.catch(error => console.log("There was an error: ", error.message));
		}

		render() {
			const {
				position,
				weatherSI,
				weatherUS,
				queryLocationHits,
				loading
			} = this.state;
			return ( < WrappedComponent {
					...this.props
				}
				position = {
					position
				}
				weatherSI = {
					weatherSI
				}
				weatherUS = {
					weatherUS
				}
				searchForPosition = {
					this.searchForPosition
				}
				queryLocationHits = {
					queryLocationHits
				}
				getWeather = {
					this.getWeather
				}
				loading = {
					loading
				}
				/>
			)
		}
	}
}

export default withApiCalls;