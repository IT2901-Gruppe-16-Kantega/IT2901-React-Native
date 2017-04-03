import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';
import supercluster from 'supercluster';

import MarkerCallout from '../misc/MarkerCallout'
import SidebarMain from '../misc/SidebarMain'
import SidebarSecondary from '../misc/SidebarSecondary'
import MapMarker from '../misc/MapMarker'

import {comparators, datatype} from '../../utilities/values';
import {parseGeometry, randomColor} from '../../utilities/utils'
import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions';

// Create a reference to the map, to change it's region
var map = null;

/*
View that holds the map
*/
var RoadMapView = React.createClass({
  componentDidMount() {
    this.getClusters();
  },

  render() {
    var markers;
    if(this.props.clusteringOn) {
      markers = this.createClusterMarkers();
    } else {
      markers = this.createMarkers();
    }

    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.contentView}>
        <MapView
          ref={(ref) => {map = ref} }
          style={styles.map}
          region={this.props.region}
          onRegionChange={this.changeRegion} >
          {markers}
        </MapView>
        <SidebarMain />
        <SidebarSecondary />
      </View>
    </View>
  },

  getClusters() {
    const cluster = supercluster({
      radius: 50,
      maxZoom: 16,
    });

    try {
      var features = [];
      for(var i = 0; i < this.props.allObjects.length; i++) {
        const roadObject = this.props.allObjects[i]

        if(this.shouldSkipObject(roadObject)) {
          continue;
        }

        const geo = parseGeometry(roadObject.geometri.wkt);

        const feature = { properties: { id: roadObject.id, roadObject: roadObject }, geometry: { type: "Point", coordinates: [geo[0].latitude, geo[0].longitude] } };
        features.push(feature);
      }
      cluster.load(features);
      const padding = 0;
      const markers = cluster.getClusters([
        this.props.region.latitude - (this.props.region.latitudeDelta * (0.5 + padding)),
        this.props.region.longitude - (this.props.region.longitudeDelta * (0.5 + padding)),
        this.props.region.latitude + (this.props.region.latitudeDelta * (0.5 + padding)),
        this.props.region.longitude + (this.props.region.longitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel())

      this.props.setCluster(cluster);
      this.props.setMarkers(markers);

    } catch(e) {
      alert(e);
    }
  },

  getZoomLevel() {
    const angle = this.props.region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
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
            }
            else {
              const isEqual = markerProperty.verdi === filter.verdi;
              if((isEqual && filter.funksjon === comparators.NOT_EQUAL) || (!isEqual && filter.funksjon === comparators.EQUAL)) {
                return true;
              }

              // If LARGER_OR_EQUAL, and the property value is less, skip it
              if(filter.funksjon === comparators.LARGER_OR_EQUAL) {
                if(markerProperty.verdi < filter.verdi) { return true }
              }

              // If SMALLER_OR_EQUAL, and the property is larger, skip it
              if(filter.funksjon === comparators.SMALLER_OR_EQUAL) {
                if(markerProperty.verdi > filter.verdi) { return true }
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

    return false;
  },

  createMarkers() {
    var markers = this.props.allObjects.map(function(roadObject) {

      if(this.shouldSkipObject(roadObject)) {
        return;
      }

      const objectCoordinates = parseGeometry(roadObject.geometri.wkt);

      const color = objectCoordinates.length == 1 ? templates.colors.blue : randomColor();
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

  createMarker(obj, coords, color) {
    var ref;

    return <MapView.Marker
      coordinate={coords}
      key={obj.id}
      ref={(r) => {ref = r}}
      onPress={this.props.selectMarker.bind(this, ref)}
      onSelect={this.props.selectMarker.bind(this, ref)}
      pinColor={color}
      >
      <MapView.Callout style={{flex: 1, position: 'relative'}}>
        <MarkerCallout
          roadObject={obj}
        />
      </MapView.Callout>
    </MapView.Marker>
  },

  createClusterMarkers() {
    return this.props.markers.map((marker, index) => {
      var view;

      if(marker.properties.cluster) {
        view = <View style={styles.cluster}>
          <Text style={styles.clusterText}>{marker.properties.point_count_abbreviated}</Text>
        </View>
      }
      else {
        const objectCoordinates = parseGeometry(marker.properties.roadObject.geometri.wkt);

        if(objectCoordinates.length > 1) {
          return <MapView.Polyline
            key={marker.properties.roadObject.id + 'poly'}
            coordinates={objectCoordinates}
            strokeWidth={3}
            strokeColor={templates.colors.blue} />
        } else {
          view = <MapView.Callout style={{flex: 1, position: 'relative'}}>
            <MarkerCallout
              roadObject={marker.properties.roadObject}
            />
          </MapView.Callout>
        }
      }

      return <MapView.Marker
        coordinate={{ latitude: marker.geometry.coordinates[0], longitude: marker.geometry.coordinates[1] }}
        key={index}
        onPress={this.markerPressed.bind(this, marker)}
        onSelect={this.markerPressed.bind(this, marker)}
        pinColor={templates.colors.blue} >
        {view}
      </MapView.Marker>
    })
  },

  changeRegion(region) {
    this.props.setMarkers([]);
    this.props.setCluster(null);

    this.props.setRegion(region);
    this.getClusters();
  },

  markerPressed(marker) {
    let isCluster = marker.properties && marker.properties.cluster;

    if(!isCluster) {
      return;
    }

    let region = this.props.region;

    const newRegion = {
      latitude: marker.geometry.coordinates[0],
      longitude: marker.geometry.coordinates[1],
      longitudeDelta: isCluster ? region.longitudeDelta / 5 : region.longitudeDelta,
      latitudeDelta: isCluster ? region.latitudeDelta / 5 : region.latitudeDelta,
    }
    map.animateToRegion(newRegion, 200);
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
  cluster: {
    backgroundColor: templates.colors.blue,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  clusterText: {
    color: templates.colors.white,
    fontWeight: 'bold',
  }
})

function mapStateToProps(state) {
  return {
    allObjects: state.dataReducer.currentRoadSearch.roadObjects,

    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,
    currentRoadSearch: state.dataReducer.currentRoadSearch,

    selectedFilter: state.filterReducer.selectedFilter,
    selectedFilterValue: state.filterReducer.selectedFilterValue,

    selectedObject: state.mapReducer.selectedObject,

    allSelectedFilters: state.filterReducer.allSelectedFilters,

    selectedMarker: state.mapReducer.selectedMarker,

    region: state.mapReducer.region,
    markers: state.mapReducer.markers,
    cluster: state.mapReducer.cluster,
    clusteringOn: state.settingsReducer.clusteringOn,
  };}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(mapActions.selectObject, dispatch),
    selectMarker: bindActionCreators(mapActions.selectMarker, dispatch),

    setRegion: bindActionCreators(mapActions.setRegion, dispatch),
    setMarkers: bindActionCreators(mapActions.setMarkers, dispatch),
    setCluster: bindActionCreators(mapActions.setCluster, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
