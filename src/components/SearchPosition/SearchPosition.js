import React from 'react'
import { PacmanLoader } from 'react-spinners';
import { css } from "@emotion/core";

export default class SearchPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  
	componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      this.setState({
        ...this.state,
        loading: this.props.loading
      });
    }
  }
  
  loadingStyle = css`
    position: absolute;
    background: white;
    display: inline-block;
    margin: 0 auto;
    border-color: red;
  `;

  handleSubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    this.props.searchForPosition(input.value);
  }
  
  useMyPosition = (e) => {
    e.preventDefault();
    this.props.geoLocation();
  }
  
render() {
  return (
    <div className="container py-2">
      <div className="row">
        <form className="p-2" onSubmit={this.handleSubmit}>
            <input type="text" autoComplete="off" placeholder="Search by city" required/>
            <button className="btn" style={{background:"none"}} type="submit">
        <i className="fas fa-2x fa-search-location"></i>        
            </button>
        </form>
            <button className="btn" style={{background:"none"}} onClick={this.useMyPosition}>
        <i className="far fa-2x fa-compass"></i>
            </button>
        <PacmanLoader 
        css={this.loadingStyle}
        size={20}
        color={"#3165e0"}   
        loading={this.state.loading}
        />    
      </div>
    </div>
  )

}
}
