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

import {comparators, datatype} from '../../utilities/values';
import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions';

// Create a reference to the map, to change it's region
var mapRef = null;
var coordinates = [];

/*
View that holds the map
*/
var RoadMapView = React.createClass({
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.contentView}>
        <MapView
          ref={(ref) => {mapRef = ref}}
          style={styles.map}
          >
          {this.mapObjects()}
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

  mapObjects() {
    coordinates = []

    // Goes through each fetched object, and creates a marker for the map.
    var markers = this.props.allObjects.map(function(roadObject) {

      /*var filter = {
        egenskap: this.props.selectedFilter,
        funksjon: this.props.selectedFunction,
        verdi: verdi,
      }*/
      // Filtering
      if(this.shouldSkipObject(roadObject)) {
        return;
      }

      const objectCoordinates = this.parseGeometry(roadObject.geometri.wkt);
      coordinates.push(objectCoordinates[0]);

      const color = objectCoordinates.length == 1 ? templates.colors.blue : this.getRandomColor();
      const marker = this.createMarker(roadObject, objectCoordinates[0], color);
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

    return markers;
  },

  shouldSkipObject(roadObject) {
    if(this.props.allSelectedFilters) {
      for(var i = 0; i < this.props.allSelectedFilters.length; i++) {
        const filter = this.props.allSelectedFilters[i];

        if(roadObject.egenskaper) {
          const markerProperty = roadObject.egenskaper.find(e => {
            return e.id === filter.egenskap.id;
          })

          // If the marker has the selected property
          if(markerProperty) {
            // Skip the marker if the selected filter is HAS_NOT_VALUE
            if(filter.funksjon === comparators.HAS_NOT_VALUE) {
              return true;
            }

            if(filter.egenskap.tillatte_verdier) {
              const isEqual = markerProperty.enum_id === filter.verdi.id;
              if((isEqual && filter.funksjon === comparators.NOT_EQUAL) || (!isEqual && filter.funksjon === comparators.EQUAL)) {
                return true;
              }
            } else {
              if(filter.egenskap.datatype === datatype.dato) {

              }
              const isEqual = markerProperty.verdi === filter.verdi;
              console.log(markerProperty.verdi + ', ' + filter.verdi);
              if((isEqual && filter.funksjon === comparators.NOT_EQUAL) || (!isEqual && filter.funksjon === comparators.EQUAL)) {
                return true;
              }
            }
          }
          else {
            // Skip the marker if the property doesn't exist
            if(filter.funksjon === comparators.HAS_VALUE || 
               filter.funksjon === comparators.EQUAL || filter.funksjon === comparators.NOT_EQUAL ||
               filter.funksjon === comparators.LARGER_OR_EQUAL || filter.funksjon === comparators.SMALLER_OR_EQUAL) { return true }
          }
        }
        else {
          if(filter.funksjon === comparators.HAS_VALUE || 
             filter.funksjon === comparators.EQUAL || filter.funksjon === comparators.NOT_EQUAL ||
             filter.funksjon === comparators.LARGER_OR_EQUAL || filter.funksjon === comparators.SMALLER_OR_EQUAL) { return true }
        }
      }
    }
  },

  componentDidUpdate() {
    if(mapRef) {
      mapRef.fitToCoordinates(coordinates, { edgePadding: { top: 300, right: 200, bottom: 300, left: 50 }, animated: true })
    }
  },

  createMarker(obj, coords, color) {
    return <MapView.Marker
      coordinate={coords}
      key={obj.id}
      pinColor={color}
      >
      <MapView.Callout style={{flex: 1, position: 'relative'}}>
        <MarkerCallout
          roadObject={obj}
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

    allSelectedFilters: state.filterReducer.allSelectedFilters,
  };}

function mapDispatchToProps(dispatch) {
  return {
    updateMapMarkers: bindActionCreators(mapActions.updateMapMarkers, dispatch),
    selectObject: bindActionCreators(mapActions.selectObject, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
