import React from "react";

const withApiCalls = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                position: "",
                weather: ""
        }
        this.getMyPosition = this.getMyPosition.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }
        componentDidMount() {
            this.getMyPosition();
        }

        /* 
        -------------------------------------- 
        GEOLOCATION
        -------------------------------------- 
        */ 

        getMyPosition() {
            const options = {
                enableHighAccuracy: false,
                timeout: 6000,
                maximumAge: 0
              };

            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    ...this.state, 
                    position: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
                this.getWeather();
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
        DARKSKY API
        -------------------------------------- 
        */ 
        
        getWeather = () => {
            // API call options
            // Using a proxy to handle CORS issues while in dev-mode
            const devCorsProxy = "https://cors-anywhere.herokuapp.com";
            const baseUrl = "https://api.darksky.net";
            const parameters = "forecast";
            const darkskyApiKey = process.env.REACT_APP_DARKSKY_KEY;
            const latitude = this.state.position.latitude;
            const longitude = this.state.position.longitude;

            //fetch data
            const url = `${devCorsProxy}/${baseUrl}/${parameters}/${darkskyApiKey}/${latitude},${longitude}`;
            fetch(url).then(response => {
                if(response.ok) {
                    return response.json();
                } else { 
                    throw new Error('Connection to DarkSky API failed');
                }
            })
            .then(data => this.setState({
                ...this.state, weather: data
            }))
            .catch(error => console.log("There was an error: ", error.message));
        } 

        render() {
            const { position, weather } = this.state;
            return ( 
            <WrappedComponent 
                {...this.props}
                position= {position}
                weather= {weather}
                />
            )
        }
    }
}

export default withApiCalls;
