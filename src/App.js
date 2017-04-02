import React, { Component } from 'react';
import firebase from 'firebase';
import Map from './components/Map';
import InputBox from './components/InputBox';

import './styles.css';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
        name: "",
        latitude: "",
        longitude: "",
        markerData: [],
        showInfo: []
    }
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onSubmitFunction = this.onSubmitFunction.bind(this);
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyDmhScxaAdwgg0d5nQSh6Na7zI_XrKNmbA",
      authDomain: "gmapmarkerspa.firebaseapp.com",
      databaseURL: "https://gmapmarkerspa.firebaseio.com",
      projectId: "gmapmarkerspa",
      storageBucket: "gmapmarkerspa.appspot.com",
      messagingSenderId: "372939241236"
    };
    firebase.initializeApp(config);
    this.getData();
  }

  getData() {
    var tempArray = [];
    firebase.database().ref('markerData').once("value").then(val => {
      if(val.val()) {
        val.val().map((item,index) => {
          return tempArray[index] = false;
        })
      }
      this.setState({
        markerData: val.val() || [],
        showInfo: tempArray || []
      })
    });
  }

  showInfo(id) {
    var tempArray = this.state.showInfo.slice();
    tempArray[id] = true;
    this.setState({
      showInfo : tempArray
    });
  }

  hideInfo(id) {
    var tempArray = this.state.showInfo.slice();
    tempArray[id] = false;
    this.setState({
      showInfo : tempArray
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value
    });
  }

  onChangeLongitude(e) {
    this.setState({
      longitude: e.target.value
    });
  }

  onSubmitFunction() {
    var tempArray = [];
    if(this.state.markerData.length) {
      tempArray = this.state.markerData.slice();
    }
    var lat = parseFloat(this.state.latitude,10);
    var lng = parseFloat(this.state.longitude,10);
    tempArray.push({name: this.state.name, position:{lat: lat, lng: lng}});
    firebase.database().ref('markerData').set(tempArray);
    this.setState ({
      name: "",
      latitude: "",
      longitude: ""
    });
    this.getData();
  }

  render() {
    var disableSubmit = true;
    if(this.state.name && this.state.latitude && this.state.longitude) {
      if((this.state.latitude >= -85) && (this.state.latitude <= 85) && (this.state.longitude >= -180) && (this.state.longitude <= 180   ))
        disableSubmit = false;
    }
    return (
      <div className="container">
        <div className="mapContainer">
        <Map markerData={this.state.markerData} showInfo={this.showInfo.bind(this)} hideInfo={this.hideInfo.bind(this)} showInfoArray={this.state.showInfo}/></div>
        <div className="formContainer">
          <div className="heading">Enter Details</div>
          <InputBox onChangeField={this.onChangeName.bind(this)} fieldValue={this.state.name} placeholder="Enter Name" />
          <InputBox onChangeField={this.onChangeLatitude.bind(this)} fieldValue={this.state.latitude} placeholder="Enter Latitude" />
          <InputBox onChangeField={this.onChangeLongitude.bind(this)} fieldValue={this.state.longitude} placeholder="Enter Longitude" />
          <div className="buttonContainer">
            <button onClick={this.onSubmitFunction} disabled={disableSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
