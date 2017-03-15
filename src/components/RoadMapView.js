import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as templates from '../utilities/templates'
import MapView from 'react-native-maps';

import { Footer } from './Footer';

var region = null;
var markers = [];

// View that holds the map
var RoadMapView = React.createClass({
  componentWillMount() {
    let regionString = this.props.region;
    let geometryString = regionString.split('(')[1].slice(0, -1);
    let geometryParts = geometryString.split(' ');
    let objLat = parseFloat(geometryParts[0]);
    let objLong = parseFloat(geometryParts[1]);
    region = {
      latitude: objLat,
      longitude: objLong,
      latitudeDelta: 1,
      longitudeDelta: 1,
    }

    this.createMapMarkers();
  },

  render() {
    return <View style={styles.container}>
      <View style={styles.contentView}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={this.mapRegionChanged}
          onLongPress={this.mapPressed}
          zoomEnabled={true}
          >
          {markers}
        </MapView>
        <View
          style={StyleSheet.flatten([styles.sidebar, {flex: this.props.filterFlex}])}
        >
        </View>
      </View>
      <Footer />
    </View>
  },

  createMapMarkers() {

    // Goes through each fetched object, and creates a marker for the map.
    markers = this.props.objects.map(function(object) {
      const geometryString = object.geometri.wkt.split('(')[1].slice(0, -1);
      const geometryParts = geometryString.split(' ');

      const objLat = parseFloat(geometryParts[0]);
      const objLong = parseFloat(geometryParts[1]);

      const latLong = {latitude: objLat, longitude: objLong};

      var chosenColor;
      if(object.geometri.egengeometri) { chosenColor = 'green'; }
      else { chosenColor = 'red'; }

      const id = object.id;
      const stringID = id.toString();

      return <MapView.Marker
        coordinate={latLong}
        title={stringID}
        description={stringID}
        key={stringID}
        pinColor={chosenColor}
        />
    });
  },

  mapRegionChanged(region) {
    // Use for marker clustering.
  },

  mapPressed(press) {
    let coordinate = press.nativeEvent.coordinate;
  },
});

function mapStateToProps(state) {
  return {
    objects: state.dataReducer.currentRoadSearch.roadObjects,
    region: state.dataReducer.currentRoadSearch.searchParameters[0].senterpunkt.wkt,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
    filterFlex: state.mapReducer.filterFlex,
  };}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
  },
  contentView: {
    flexDirection: 'row',
    flex: 18,
  },
  sidebar: {
    backgroundColor: templates.gray,
  },
  map: {
    flex: 1,
  },
})

//function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, null) (RoadMapView);
