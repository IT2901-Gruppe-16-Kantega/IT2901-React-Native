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
import moment from 'moment';
import supercluster from 'supercluster';

import Container from '../misc/Container'
import MarkerCallout from '../misc/MarkerCallout'
import SidebarMain from '../misc/SidebarMain'
import SidebarSecondary from '../misc/SidebarSecondary'

import * as templates from '../../utilities/templates';
import {parseGeometry, randomColor} from '../../utilities/utils'
import {comparators, datatype, importance} from '../../utilities/values';

import * as dataActions from '../../actions/dataActions';
import * as mapActions from '../../actions/mapActions';
import * as reportActions from '../../actions/reportActions';

// Create a reference to the map, to change it's region
var map = null;

/*
View that holds the map
*/
var RoadMapView = React.createClass({
  componentDidMount() {
    setTimeout(() => {
      this.createCluster();
    }, 1000);
  },

  componentDidUpdate(prevProps) {
    if(prevProps.allSelectedFilters !== this.props.allSelectedFilters) {
      setTimeout(() => {
        this.createCluster();
      }, 10)
    }
  },

  createCluster() {
    const cluster = supercluster({
      maxZoom: 14,
      radius: 70,
      nodeSize: 128,
    });

    var features = [];
    for(var i = 0; i < this.props.roadObjects.length; i++) {
      const roadObject = this.props.roadObjects[i]

      if(this.shouldSkipObject(roadObject)) {
        continue;
      }

      const geo = parseGeometry(roadObject.geometri.wkt);
      const feature = { properties: { roadObject: roadObject }, geometry: { type: "Point", coordinates: [geo[0].latitude, geo[0].longitude] } };
      features.push(feature);

      if(!this.props.region) {
        this.props.setRegion({ latitude: geo[0].latitude, longitude: geo[0].longitude, latitudeDelta: 1, longitudeDelta: 1 })
      }
      this.props.setRegion({ latitude: geo[0].latitude, longitude: geo[0].longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 })
    }
    cluster.load(features);
    this.props.setCluster(cluster);

    setTimeout(() => {
      this.setMarkersAtRegion();
    }, 500)
  },

  render() {
    return <Container>
      <View style={{ flex: 1 }}>
        <MapView
          ref={(ref) => {map = ref} }
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={this.props.region}
          onRegionChange={this.changeRegion} >
          {this.props.markers}
        </MapView>
        <SidebarMain />
        <SidebarSecondary />
      </View>
    </Container>
  },

  addMarker(e) {
    if(this.getZoomLevel() < 16) {
      alert("Du må zoome inn nærmere for å legge til objekter.");
      return;
    }

    var coords;
    if(e.nativeEvent && e.nativeEvent.coordinate) {
      coords = e.nativeEvent.coordinate;
    }
    const now = moment();

    var wkt;
    var requiredProperties = [];
    for(var i = 0; i < this.props.objekttypeInfo.egenskapstyper.length; i++) {
      const egenskapstype = this.props.objekttypeInfo.egenskapstyper[i];
      if(egenskapstype.viktighet === importance.PAKREVD_ABSOLUTT || egenskapstype.viktighet === importance.PAKREVD) {
        var egenskap = {
          id: egenskapstype.id,
          navn: egenskapstype.navn,
          datatype: egenskapstype.datatype,
          datatype_tekst: egenskapstype.datatype_tekst,
          verdi: null,
        }

        if(egenskapstype.datatype == datatype.geomPunkt) {
          wkt = "POINT (" + coords.latitude + " " + coords.longitude + ")";
          egenskap.verdi = wkt;
        }

        requiredProperties.push(egenskap);
      }
    }

    const object = {
      id: now.unix(),
      href: null,
      ny: true, // Add flag to show this is a newly created object
      metadata: {
        type: {
          id: this.props.objekttypeInfo.id,
          navn: this.props.objekttypeInfo.navn
        },
        versjon: 1,
        sist_modifisert: now.format("YYYY-MM-DD HH:mm:ss"),
        startdato: now.format("YYYY-MM-DD"),
      },
      egenskaper: requiredProperties,
      geometri: {
        wkt: wkt,
        egengeometri: false,
      },
      lokasjon: null,
    }
    this.props.addRoadObject(object);
    this.props.selectObject(object);

    setTimeout(() => {
      this.createCluster();
    }, 10)

    setTimeout(() => {
      Actions.ObjectInfoView();
    }, 500)
  },

  setMarkersAtRegion() {
    if(this.props.cluster && this.props.cluster.getClusters) {
      const m = 2;
      const markers = this.props.cluster.getClusters([
        this.props.region.latitude - (this.props.region.latitudeDelta * m),
        this.props.region.longitude - (this.props.region.longitudeDelta * m),
        this.props.region.latitude + (this.props.region.latitudeDelta * m),
        this.props.region.longitude + (this.props.region.longitudeDelta * m),
      ], this.getZoomLevel());

      if(markers) {
        const m = this.createMapFeatures(markers);
        this.props.setMarkers(m);
      }
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

  createMapFeatures(markers) {
    return markers.map((marker, index) => {
      if(marker.properties.cluster) {
        return <MapView.Marker
          coordinate={{ latitude: marker.geometry.coordinates[0], longitude: marker.geometry.coordinates[1] }}
          onPress={this.markerPressed.bind(this, marker)}
          onSelect={this.markerPressed.bind(this, marker)}
          key={index} >
          <View style={styles.cluster}>
            <View style={styles.clusterInner}>
              <Text style={styles.clusterText}>{marker.properties.point_count_abbreviated}</Text>
            </View>
          </View>
        </MapView.Marker>
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
          return <MapView.Marker
            coordinate={{ latitude: marker.geometry.coordinates[0], longitude: marker.geometry.coordinates[1] }}
            key={marker.properties.roadObject.id}
            pinColor={templates.colors.blue} >
            <MapView.Callout style={{ zIndex: 10, flex: 1, position: 'relative'}}>
              <MarkerCallout roadObject={marker.properties.roadObject} />
            </MapView.Callout>
          </MapView.Marker>
        }
      }
    })
  },

  changeRegion(region) {
    this.props.setRegion(region);
    this.setMarkersAtRegion()
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
  cluster: {
    zIndex: 2,
    backgroundColor: templates.colors.blueTransparent,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  clusterInner: {
    backgroundColor: templates.colors.blue,
    padding: 10,
    height: 50,
    width: 50,
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
    roadObjects: state.dataReducer.currentRoadSearch.roadObjects,

    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,

    selectedFilter: state.filterReducer.selectedFilter,
    selectedFilterValue: state.filterReducer.selectedFilterValue,

    selectedObject: state.dataReducer.selectedObject,

    allSelectedFilters: state.filterReducer.allSelectedFilters,

    selectedMarker: state.mapReducer.selectedMarker,

    region: state.mapReducer.region,
    markers: state.mapReducer.markers,
    cluster: state.mapReducer.cluster,
    clusteringOn: state.settingsReducer.clusteringOn,
  };}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
    selectMarker: bindActionCreators(mapActions.selectMarker, dispatch),

    addRoadObject: bindActionCreators(reportActions.addRoadObject, dispatch),
    setRegion: bindActionCreators(mapActions.setRegion, dispatch),
    setMarkers: bindActionCreators(mapActions.setMarkers, dispatch),
    setCluster: bindActionCreators(mapActions.setCluster, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
