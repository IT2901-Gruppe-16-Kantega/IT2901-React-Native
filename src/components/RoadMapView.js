import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as templates from '../utilities/templates';

import * as mapActions from '../actions/mapActions';

import { MarkerCallout } from './MarkerCallout'
import SidebarMain from './SidebarMain'
import SidebarSecondary from './SidebarSecondary'

// Create a reference to the map, to change it's region
var mapRef = null;
var coordinates = [];

// View that holds the map
var RoadMapView = React.createClass({
  componentWillMount() {
    this.updateMarkers();
  },

  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.contentView}>
        <MapView
          ref={(ref) => {mapRef = ref}}
          onLayout = {() => mapRef.fitToCoordinates(coordinates, { edgePadding: { top: 20, right: 20, bottom: 20, left: 20 }, animated: false })}
          style={styles.map}
          zoomEnabled={true}
          >
          {this.props.markers}
        </MapView>
        <SidebarMain />
        <SidebarSecondary update={this.updateMarkers} />
      </View>
    </View>
  },

  updateMarkers() {
    coordinates = [];

    // Goes through each fetched object, and creates a marker for the map.
    const markers = this.props.filteredObjects.map(function(roadObject) {
      const geometryString = roadObject.geometri.wkt.split('(')[1].slice(0, -1);
      const geometryParts = geometryString.split(' ');

      const objectLatitude = parseFloat(geometryParts[0]);
      const objectLongitude = parseFloat(geometryParts[1]);

      const coordinate = {latitude: objectLatitude, longitude: objectLongitude};
      coordinates.push(coordinate);

      var roadObjectEgenskap;
      var chosenColor;
      var markerDescription;

      chosenColor = 'red';

      return <MapView.Marker
        coordinate={coordinate}
        key={roadObject.id}
        pinColor={chosenColor}>
        <MapView.Callout style={{flex: 1, position: 'relative'}}>
          <MarkerCallout roadObject={roadObject} roadObjectEgenskap={roadObjectEgenskap} />
        </MapView.Callout>
      </MapView.Marker>
    });

    this.props.updateMapMarkers(markers);
  },

  componentDidUpdate() {
    console.log(this.props.selectedFilterValue)
  }
});

var styles = StyleSheet.create({
  top: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 20,
    right: 0,
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
  },
  contentView: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    right: 0,
    top: 20,
    left: 0,
    bottom: 0,
  },
})

function mapStateToProps(state) {
  return {
    allObjects: state.dataReducer.currentRoadSearch.roadObjects,
    filteredObjects: state.mapReducer.filteredObjects,

    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,
    region: state.dataReducer.currentRoadSearch.searchParameters[0].senterpunkt.wkt,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
    markers: state.mapReducer.markers,

    selectedFilterValue: state.mapReducer.selectedFilterValue,
  };}

function mapDispatchToProps(dispatch) {
  return {
    updateMapMarkers: bindActionCreators(mapActions.updateMapMarkers, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
