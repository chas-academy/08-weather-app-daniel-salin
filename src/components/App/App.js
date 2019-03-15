import React, { Component } from 'react';
import './App.css';

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer"
import WeatherIcon from "../WeatherIcon/WeatherIcon";

import withApiCalls from "../../HOC/withApiCalls";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitType: "",
      weather: ""
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.weatherSI !== prevProps.weatherSI) {
      this.setState({
        ...this.state,
        weather: this.props.weatherSI,
        unitType: "Metric",
        queryLocationHits: this.props.queryLocationHits
      });
    }
  }

  convertUnits = () => {
    (this.state.unitType === "Metric") ?
    this.setState({
      ...this.state,
      weather: this.props.weatherUS,
      unitType: "American"
    }): this.setState({
      ...this.state,
      weather: this.props.weatherSI,
      unitType: "Metric"
    })
  }

  render() {
      const {
        position,
        weatherSI,
        searchForPosition
      } = this.props;

      if (!window.navigator) {
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
        } 
   else if(position === "NA") {
         return ( 
             <div className="container bg-danger text-light">
             <h1>FAILED TO ACQUIRE POSITION</h1>
                 <p>Please hold while we're acquiring your position</p>
             </div>
            )
        } 
      
    else if(weatherSI === "") {
        return(
            <div className="container bg-primary text-light">
                <h1>LOADING WEATHER</h1>
                <WeatherIcon />
            </div>
        )
     } else if(this.state.weather === "") {
      return (
        <div className="container bg-primary text-light">
          <h1>CORRECTING STATE</h1>
        </div>
      )
     } else {
       const { weather, unitType } = this.state;
       const { queryLocationHits, getWeather, position, loading, geoLocation } = this.props;
        return (
          <div>
            <Header 
            position = { position }
            unitType = {  unitType } 
            convertUnits = { this.convertUnits } 
            searchForPosition = { searchForPosition }
            geoLocation = { geoLocation }
            queryLocationHits = { queryLocationHits }
            getWeather = { getWeather }
            loading = { loading }
            />
            <Main 
            unitType = { unitType } 
            weather = { weather } />
            <Footer />
        </div>
    )}}
}

export default withApiCalls(App);