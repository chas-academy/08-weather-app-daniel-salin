import React from "react";

export default function withApiCalls(WrappedComponent) {

    const getMyPosition = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        const success = position => {
            return position.coords;
        };

        const error = error => {
            return error
        };

        return navigator.geolocation.getCurrentPosition(success, error, options);
    }

    const UpdateCoordinates = () => {
        this.setState({
            position: this.getMyPosition()
        });
    };

    return props => ( 
    <WrappedComponent 
        getMyPosition={getMyPosition} 
        UpdateCoordinates={UpdateCoordinates}
        {...props}
        />
    )
}