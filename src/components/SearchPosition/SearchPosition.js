import React from 'react'

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
    <div className="container m-0">
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
      </div>
    </div>
  )

}
}
