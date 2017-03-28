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

import MarkerCallout from './MarkerCallout'
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
    const padding = { edgePadding: { top: 40, right: 40, bottom: 40, left: 40 }};

    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.contentView}>
        <MapView
          ref={(ref) => {mapRef = ref}}
          onLayout = {() => mapRef.fitToCoordinates(coordinates, { padding, animated: true })}
          style={styles.map}
          zoomEnabled={true}
          >
          {this.updateMarkers()}
        </MapView>
        <SidebarMain />
        <SidebarSecondary />
      </View>
    </View>
  },

  updateMarkers() {
    coordinates = [];

    // Goes through each fetched object, and creates a marker for the map.
    return this.props.allObjects.map(function(roadObject) {
      const geometryString = roadObject.geometri.wkt.split('(')[1].slice(0, -1);
      const geometryParts = geometryString.split(' ');

      const objectLatitude = parseFloat(geometryParts[0]);
      const objectLongitude = parseFloat(geometryParts[1]);

      const coordinate = {latitude: objectLatitude, longitude: objectLongitude};
      coordinates.push(coordinate);

      var roadObjectEgenskap = roadObject.egenskaper.find(egenskap => {
        console.log(egenskap.id + ', ' + this.props.selectedFilter.id);
        return (egenskap.id == this.props.selectedFilter.id);
      });

      return <MapView.Marker
        coordinate={coordinate}
        key={roadObject.id}
        pinColor={templates.colors.blue}
        >
        <MapView.Callout style={{flex: 1, position: 'relative'}}>
          <MarkerCallout
            roadObject={roadObject}
            selectedFilter={this.props.selectedFilter}
            roadObjectEgenskap={roadObjectEgenskap}
          />
        </MapView.Callout>
      </MapView.Marker>
    }.bind(this));

    this.props.updateMapMarkers(markers);
  },
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

    selectedFilter: state.mapReducer.selectedFilter,
    selectedFilterValue: state.mapReducer.selectedFilterValue,

    selectedObject: state.mapReducer.selectedObject,
  };}

function mapDispatchToProps(dispatch) {
  return {
    updateMapMarkers: bindActionCreators(mapActions.updateMapMarkers, dispatch),
    selectObject: bindActionCreators(mapActions.selectObject, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
