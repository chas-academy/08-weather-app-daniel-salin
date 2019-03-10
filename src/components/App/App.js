import React, { Component } from 'react';
import './App.css';

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";

// HOC
import withApiCalls from "../../HOC/withApiCalls";

const MainWithApiCalls = withApiCalls(Main);

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainWithApiCalls />
      </div>
    )
  }
}

