import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import MarkerCallout from '../misc/MarkerCallout'

import * as searchActions from '../../actions/searchActions';
import {fetchCloseby} from '../../utilities/wrapper'

var mapRef;
var markerRef;

var RoadSelectView = React.createClass({
  render() {
    var marker;
    const coords = this.props.searchCoordinate;

    if(this.props.searchCoordinate) {
      marker = <MapView.Marker
        ref={(ref) => {markerRef = ref}}
        coordinate={this.props.searchCoordinate}
        title={this.props.searchCoordinate.latitude.toString()}
        description="R1090"
        >
      </MapView.Marker>
    }

    return <MapView
      ref={(ref) => {mapRef = ref}}
      showsUserLocation={true}
      onPress={this.mapPressed}
      style={styles.map}>
      {marker}
    </MapView>
  },

  mapPressed(info) {
    const {coordinate} = info.nativeEvent;
    this.props.selectSearchCoordinate(coordinate);

    coordinate.latitudeDelta = 0.01;
    coordinate.longitudeDelta = 0.01;


    if(markerRef) {
      markerRef.showCallout();
      mapRef.animateToRegion(coordinate, 1000)
    }

    fetchCloseby(coordinate, function(data) {
      console.log(data);
      this.props.fylke_input = data.vegreferanse.fylke;
    }.bind(this));
  }
})

var styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})

function mapStateToProps(state) {
  return {
    searchCoordinate: state.searchReducer.searchCoordinate,
    fylke_input: state.searchReducer.fylke_input,
  };}

function mapDispatchToProps(dispatch) {
  return {
    selectSearchCoordinate: bindActionCreators(searchActions.selectSearchCoordinate, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadSelectView);
