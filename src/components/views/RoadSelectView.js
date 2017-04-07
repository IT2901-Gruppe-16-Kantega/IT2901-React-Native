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
import {kommuner} from '../../data/kommuner';
import {parseGeometry, randomColor} from '../../utilities/utils'
import * as templates from '../../utilities/templates'

var mapRef;
var markerRef;
var message;

var RoadSelectView = React.createClass({
  render() {
    var marker;
    var polygon;
    const coords = this.props.searchCoordinate;

    var polygons = [];
    /*for(var i = 0; i < kommuner.length; i++) {
      const kommune = kommuner[i]
      const color = randomColor(0.25)
      polygons.push(<MapView.Polygon
        key={i}
        coordinates={parseGeometry(kommune.kartutsnitt.wkt)}
        strokeColor={color}
        fillColor={color}
        ></MapView.Polygon>)
    }*/

    if(this.props.searchCoordinate) {
      marker = <MapView.Marker
        ref={(ref) => {markerRef = ref}}
        coordinate={coords}
        title={message}
        description={coords.latitude + ', ' + coords.longitude}
        >
      </MapView.Marker>

      polygon = <MapView.Polygon
        coordinates={this.props.fylkeCoordinates}
        strokeColor={templates.colors.black}
        fillColor={templates.colors.orangeTransparent}
        >
      </MapView.Polygon>
    }

    return <MapView
      ref={(ref) => {mapRef = ref}}
      showsUserLocation={true}
      onPress={this.mapPressed}
      style={styles.map}>
      {marker}
      {polygon}
      {polygons}
    </MapView>
  },

  mapPressed(info) {
    const {coordinate} = info.nativeEvent;

    fetchCloseby(coordinate, function(closest) {
      if(closest.code) {
        message = closest.message;
      } else {
        const veg = closest.vegreferanse.kategori + closest.vegreferanse.nummer;
        message = closest.vegreferanse.kortform;

        this.props.inputVeg(veg);
        this.props.setFylkeCoordinates(parseGeometry(closest.fylke.kartutsnitt.wkt))
        this.props.chooseFylke([closest.fylke]);
        this.props.selectSearchCoordinate(coordinate);

        console.log(this.props.fylke_chosen)
      }

      coordinate.latitudeDelta = 0.01;
      coordinate.longitudeDelta = 0.01;

      if(markerRef) {
        markerRef.showCallout();
        mapRef.animateToRegion(coordinate, 1000)
      }

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
    fylke_chosen: state.searchReducer.fylke_chosen,
    searchCoordinate: state.searchReducer.searchCoordinate,
    fylke_input: state.searchReducer.fylke_input,
    fylkeCoordinates: state.searchReducer.fylkeCoordinates,
  };}

function mapDispatchToProps(dispatch) {
  return {
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    selectSearchCoordinate: bindActionCreators(searchActions.selectSearchCoordinate, dispatch),
    setFylkeCoordinates: bindActionCreators(searchActions.setFylkeCoordinates, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadSelectView);
