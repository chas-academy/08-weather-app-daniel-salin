import React, { Component } from 'react';
import './App.css';

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer"
import WeatherIcon from "../WeatherIcon/WeatherIcon";

import withApiCalls from "../../HOC/withApiCalls";
import NoPosition from '../NoPosition/NoPosition';


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
    const { weather, unitType } = this.state;
    const {
      queryLocationHits, 
      getWeather, 
      loading,
      position,
      weatherSI,
      searchForPosition,
      geoLocation
      } = this.props;

    if (!window.navigator || position === "NA") {
      return (
        <NoPosition 
        searchForPosition={searchForPosition} 
        geoLocation={geoLocation} 
        queryLocationHits = { queryLocationHits }
        loading={loading} 
        getWeather={getWeather}
        />
      )
    } 
    else if(weatherSI === "") {
      return(
        <div className="container mx-auto p-5">
          <WeatherIcon />
        </div>
      )
     } else {
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