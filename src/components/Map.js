import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const InitMap = withGoogleMap(props => {
  if(props.markers.length > 0) {
    var markerData = (
      props.markers.map((marker,index) => (
        <Marker key={index} position={{lat : marker.position.lat,lng: marker.position.lng}}
          onClick={() => props.showInfo(index)}>
          {props.showInfoArray[index] && (
            <InfoWindow onCloseClick={() => props.hideInfo(index)}>
              <div>{marker.name}</div>
            </InfoWindow>
          )}
        </Marker>
      )
      )
    )
  }
  return (
    <GoogleMap defaultZoom={3} defaultCenter={{lat: 9.9312, lng: 76.2673}}>
      {markerData}
    </GoogleMap>
  )
});

export default class Map extends Component {
  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <InitMap containerElement={
          <div style={{height: "100%"}} />
        }
        mapElement={
          <div style={{height: "100%"}} />
        }
        markers={this.props.markerData || []}
         showInfo={this.props.showInfo} hideInfo={this.props.hideInfo} showInfoArray={this.props.showInfoArray}
        />
      </div>
    )
  }
}
