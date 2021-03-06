import React from "react/addons";
import {GoogleMaps, Circle, InfoWindow} from "react-google-maps";

var {geolocation} = navigator;

if (!geolocation) {
  geolocation = {
    getCurrentPosition: (success, failure) => { failure("Your browser doesn't support geolocation."); }
  };
}
/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 */
const Geolocation = React.createClass({

  getInitialState () {
    return {
      center: null,
      content: null,
    };
  },

  componentDidMount () {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        content: "Location found using HTML5.",
      });
    }, (reason) => {
      this.setState({
        center: {
          lat: 60,
          lng: 105
        },
        content: `Error: The Geolocation service failed (${ reason }).`
      });
    });
  },

  render () {
    const {props, state} = this,
          {googleMapsApi, ...otherProps} = props,
          {center} = state;

    return (
      <GoogleMaps containerProps={{
          ...otherProps,
          style: {
            height: "100%",
          },
        }} mapProps={{
          style: {
            height: "100%",
          },
        }}
        googleMapsApi={googleMapsApi}
        zoom={12}
        center={center}>
        {center ? <InfoWindow position={center} content={state.content} /> : null}
        {center ? <Circle center={center} radius={2000} fillColor="red" fillOpacity={0.20} strokeColor="red" strokeOpacity={1} strokeWeight={1} /> : null}
      </GoogleMaps>
    );
  }
});

export default React.createClass({
  render () {
    return (
      <Geolocation googleMapsApi={google.maps} {...this.props} />
    );
  }
});
