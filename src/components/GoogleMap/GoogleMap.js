import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

    mapCenter: {
      lat:7.291418,
      lng:80.636696
    }
  };
 
  onMarkerClick = (props, marker, e) => this.setState ({

      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true

    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) 
      {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
      })
    }
  };
 
  render() {
    return (
      <div className="contaoner-fluid" style={{height:"20%"}}>
      <Map google={this.props.google}
        initialCenter={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }}
        minZoom={6}
        onClick={this.onMapClicked}>
        <Marker 
        
          position={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
        />

        <Marker 
          
          position={{
            lat: 7.3360,
            lng: 80.627365
          }} 
        />
        <Marker 
          
          position={{
            lat: 7.286606,
            lng: 80.565659
          }} 
        />
        <Marker 
          
          position={{
            lat: 7.300395,
            lng: 80.627480
          }} 
        />

        <Marker 
          
          position={{
            lat: 7.277835,
            lng: 80.617981
          }} 
        />

      </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({

  apiKey: ('AIzaSyC_n8OU9oXyKY5Wrw4jFGRevWda1Dcx9ro')

})(MapContainer)