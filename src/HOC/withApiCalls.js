import React from "react";

const withApiCalls = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                position: ""
        }
        this.getMyPosition = this.getMyPosition.bind(this);
    }
        componentDidMount() {
            this.getMyPosition();
        }

        getMyPosition() {
            const options = {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
              };

            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    position: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
              }, (error) => {
                this.setState({ position: "NA"})
              }, options)
            }
        
          }

        render() {
            const { position } = this.state;
            return ( <
                WrappedComponent 
                {...this.props}
                position= {position}
                />
            )
        }
    }
}

export default withApiCalls;
