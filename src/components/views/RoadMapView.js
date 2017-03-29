import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import MarkerCallout from '../misc/MarkerCallout'
import SidebarMain from '../misc/SidebarMain'
import SidebarSecondary from '../misc/SidebarSecondary'

import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions';

// Create a reference to the map, to change it's region
var mapRef = null;
var coordinates = [];

/*
View that holds the map
*/
var RoadMapView = React.createClass({
  componentDidMount() {
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
          {this.props.markers}
        </MapView>
        <SidebarMain />
        <SidebarSecondary />
      </View>
    </View>
  },

  parseGeometry(string) {
    const wkt = string.slice(string.indexOf("(") + 1, -1);
    const wktArray = wkt.split(",")

    objectCoords = [];
    for(var i = 0; i < wktArray.length; i++) {
      const parts = wktArray[i].trim().split(' ');
      const latitude = parseFloat(parts[0]);
      const longitude = parseFloat(parts[1]);

      objectCoords.push({latitude: latitude, longitude: longitude});
    }
    return objectCoords;
  },

  updateMarkers() {
    console.log("updated")

    // Goes through each fetched object, and creates a marker for the map.
    var markers = this.props.allObjects.map(function(roadObject) {
      const objectCoordinates = this.parseGeometry(roadObject.geometri.wkt);
      coordinates.push(objectCoordinates[0]);

      var roadObjectEgenskap;
      // Some objects don't have any properties
      if(roadObject.egenskaper) {
        roadObjectEgenskap = roadObject.egenskaper.find(egenskap => {
          return (egenskap.id == this.props.selectedFilter.id);
        });
      }

      const color = objectCoordinates.length == 1 ? templates.colors.blue : this.getRandomColor();
      const marker = this.createMarker(roadObject, objectCoordinates[0], roadObjectEgenskap, color);
      if(objectCoordinates.length == 1) {
        return marker;
      } else {

        return [<MapView.Polyline
          key={roadObject.id + 'poly'}
          coordinates={objectCoordinates}
          strokeWidth={3}
          strokeColor={color} />, marker]
      }

    }.bind(this));

    this.props.updateMapMarkers(markers);
  },

  createMarker(obj, coords, props, color) {
    return <MapView.Marker
      coordinate={coords}
      key={obj.id}
      pinColor={color}
      >
      <MapView.Callout style={{flex: 1, position: 'relative'}}>
        <MarkerCallout
          roadObject={obj}
          selectedFilter={this.props.selectedFilter}
          roadObjectEgenskap={props}
        />
      </MapView.Callout>
    </MapView.Marker>
  },

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  tapPolyline(object) {
    this.props.selectObject(object);
    Actions.ObjectInfoView();
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

    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,
    region: state.dataReducer.currentRoadSearch.searchParameters[0].senterpunkt.wkt,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
    markers: state.mapReducer.markers,

    selectedFilter: state.filterReducer.selectedFilter,
    selectedFilterValue: state.filterReducer.selectedFilterValue,

    selectedObject: state.mapReducer.selectedObject,
  };}

function mapDispatchToProps(dispatch) {
  return {
    updateMapMarkers: bindActionCreators(mapActions.updateMapMarkers, dispatch),
    selectObject: bindActionCreators(mapActions.selectObject, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
