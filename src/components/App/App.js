import React, { Component } from 'react';
import './App.css';

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer"

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
      unitType: "Metric"
    }); 
  }
}

convertUnits = () => {
  (this.state.unitType === "Metric") 
  ? this.setState({
      ...this.state, weather: this.props.weatherUS, 
      unitType: "American"
  })
  : this.setState({
      ...this.state, weather: this.props.weatherSI, 
      unitType: "Metric"
  })
}

  render() {
    const {position, weatherSI } = this.props;
    if(!window.navigator) {
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
        } else if(position === "NA") {
            return (
                <div className="container bg-danger text-light">
                <h1>FAILED TO RETRIEVE USER LOCATION ART GOES HERE</h1>
                <p>We're having trouble locating your current position. This might have to do with your browser settings or perhaps you're not interested in the weather where you are.</p>
            </div>
        )
    } else if(weatherSI === "") {
        return(
            <div className="container bg-primary text-light">
                <h1>LOADING WEATHER</h1>
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
        return (
          <div>
            <Header unitType={unitType} convertUnits={this.convertUnits}/>
            <Main unitType={unitType} weather={weather}/>
            <Footer />
        </div>
    )}}
}

export default withApiCalls(App);