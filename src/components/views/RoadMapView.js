import React from 'react';
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
import {parseGeometry, randomColor, isAndroid} from '../../utilities/utils'
import {comparators, datatype, importance} from '../../utilities/values';

import * as dataActions from '../../actions/dataActions';
import * as mapActions from '../../actions/mapActions';
import * as reportActions from '../../actions/reportActions';

// Create a reference to the map, to change it's region
var map = null;

/*
View that holds the map
*/
class RoadMapView extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.createCluster(true);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.allSelectedFilters !== this.props.allSelectedFilters) {
      console.log("componentDidUpdate:")

      setTimeout(() => {
        this.createCluster();
      }, 10)
    }
  }

  createCluster(isNew) {
    //console.log("createCluster:")
    const cluster = supercluster({
      maxZoom: 14,
      radius: 70,
      nodeSize: 128,
    });

    var features = [];
    var filteredObjects = [];

    for(var i = 0; i < this.props.roadObjects.length; i++) {
      const roadObject = this.props.roadObjects[i]

      // If the road object don't have geometry, skip it
      if(!(roadObject.geometri && roadObject.geometri.wkt)) {
        continue;
      }

      if(this.shouldSkipObject(roadObject)) {
        console.log("skip " + roadObject.id)
        continue;
      }

      filteredObjects.push(roadObject);

      const geo = parseGeometry(roadObject.geometri.wkt);
      const feature = { properties: { roadObject: roadObject }, geometry: { type: "Point", coordinates: [geo[0].latitude, geo[0].longitude] } };
      features.push(feature);

      if(i === 0 && isNew) { // Set region based on first object
        const region = { latitude: geo[0].latitude, longitude: geo[0].longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }
        this.props.setRegion(region);
      }
    }
    cluster.load(features);
    this.props.setCluster(cluster);
    this.props.setFilteredRoadObjects(filteredObjects);


    setTimeout(() => {
      this.setMarkersAtRegion();
    }, 100)
  }

  render() {
    return <Container>
      <View style={{ flex: 1 }}>
        <MapView
          showsCompass={false}
          keyboardShouldPersistTaps='always'
          ref={(ref) => {map = ref} }
          style={{ position: 'absolute', top: -this.props.navbarHeight, right: 0, left: 0, bottom: 0 }}
          showsUserLocation={true}
          region={this.props.region}
          onRegionChange={this.changeRegion.bind(this)} >
          {this.props.markers}
        </MapView>
        <SidebarMain />
        <SidebarSecondary />
      </View>
    </Container>
  }

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
  }

  setMarkersAtRegion() {
    //console.log("setMarkersAtRegion:")
    if(this.props.cluster && this.props.cluster.getClusters) {
      const padding = 0.25;
      const markers = this.props.cluster.getClusters([
        this.props.region.latitude - (this.props.region.latitudeDelta * (0.5 + padding)),
        this.props.region.longitude - (this.props.region.longitudeDelta * (0.5 + padding)),
        this.props.region.latitude + (this.props.region.latitudeDelta * (0.5 + padding)),
        this.props.region.longitude + (this.props.region.longitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());

      if(markers) {
        const m = this.createMapFeatures(markers);
        this.props.setMarkers(m);
      }
    }
  }

  getZoomLevel() {
    const angle = this.props.region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }

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
            if(filter.funksjon === comparators.HAS_NOT_VALUE) return true;

            if(filter.egenskap.tillatte_verdier && filter.verdi) {
              const isEqual = markerProperty.enum_id === filter.verdi.id;
              if((isEqual && filter.funksjon === comparators.NOT_EQUAL) || (!isEqual && filter.funksjon === comparators.EQUAL)) {
                return true;
              }
            }
            else {
              if(filter.verdi && markerProperty.verdi) {
                const fString = filter.verdi.toString().toLowerCase();
                const pString = markerProperty.verdi.toString().toLowerCase();
                const matches = new RegExp("^" + fString.split("*").join(".*") + "$").test(pString);
                //const isEqual = markerProperty.verdi === filter.verdi;
                console.log(matches + ' | ' + markerProperty.verdi);
                if((matches && filter.funksjon === comparators.NOT_EQUAL) || (!matches && filter.funksjon === comparators.EQUAL)) {
                  return true;
                }
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
            //return false;
          }
          else {
            // Skip the marker if the property doesn't exist
            if(filter.funksjon === comparators.HAS_VALUE || 
               filter.funksjon === comparators.EQUAL ||// filter.funksjon === comparators.NOT_EQUAL ||
               filter.funksjon === comparators.LARGER_OR_EQUAL || filter.funksjon === comparators.SMALLER_OR_EQUAL) { return true }
          }
        }
        else {
          if(filter.funksjon === comparators.HAS_VALUE || 
             filter.funksjon === comparators.EQUAL ||// filter.funksjon === comparators.NOT_EQUAL ||
             filter.funksjon === comparators.LARGER_OR_EQUAL || filter.funksjon === comparators.SMALLER_OR_EQUAL) { return true }
        }
      }
    }

    return false;
  }

  createMapFeatures(markers) {
    //console.log("createMapFeatures:")

    var indexesToSkip = [];
    return markers.map((marker, index) => {
      if(indexesToSkip.indexOf(index) >= 0) return;

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
            onPress={this.openObjectInformation.bind(this, marker.properties.roadObject)}
            strokeColor={templates.colors.blue} />
        } else {
          const {roadObject} = marker.properties;
          var siblings = [];

          if(roadObject && roadObject.relasjoner && roadObject.relasjoner.foreldre) {
            for(var i = index; i < markers.length; i++) {
              const innerObject = markers[i].properties.roadObject;
              if(innerObject && innerObject.relasjoner && innerObject.relasjoner.foreldre) {
                if(roadObject.relasjoner.foreldre[0].vegobjekter[0] === innerObject.relasjoner.foreldre[0].vegobjekter[0]) {
                  siblings.push(innerObject);
                  indexesToSkip.push(i);
                }
              }
            }
          } else {
            siblings = [roadObject];
          }

          return <MapView.Marker
            onPress={this.markerPressed.bind(this, marker)}
            onSelect={this.markerPressed.bind(this, marker)}
            coordinate={{ latitude: marker.geometry.coordinates[0], longitude: marker.geometry.coordinates[1] }}
            key={marker.properties.roadObject.id}
            pinColor={templates.colors.blue}>
            <MapView.Callout onPress={this.openFullscreenCallout.bind(this, siblings)} style={{ zIndex: 10, flex: 1, position: 'relative'}}>
              <MarkerCallout siblings={siblings} />
            </MapView.Callout>
          </MapView.Marker>
        }
      }
    })
  }

  openObjectInformation(ro) {
    this.props.selectObject(ro);
    Actions.ObjectInfoView();
  }

  openFullscreenCallout(siblings) {
    if(isAndroid()) {
      Actions.MarkerCallout({siblings, fullscreen: true})
    }
  }

  changeRegion(region) {
    //console.log("changeRegion:")
    this.props.setRegion(region);
    this.setMarkersAtRegion()
  }

  markerPressed(marker) {
    let isCluster = marker.properties && marker.properties.cluster;
    if(!isCluster) return;

    let region = this.props.region;

    const newRegion = {
      latitude: marker.geometry.coordinates[0],
      longitude: marker.geometry.coordinates[1],
      longitudeDelta: isCluster ? region.longitudeDelta / 5 : region.longitudeDelta,
      latitudeDelta: isCluster ? region.latitudeDelta / 5 : region.latitudeDelta,
    }
    map.animateToRegion(newRegion, 200);
  }
}

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

    filteredRoadObjects: state.dataReducer.filteredRoadObjects,

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

    navbarHeight: state.uiReducer.navbarHeight,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
    selectMarker: bindActionCreators(mapActions.selectMarker, dispatch),

    addRoadObject: bindActionCreators(reportActions.addRoadObject, dispatch),
    setRegion: bindActionCreators(mapActions.setRegion, dispatch),
    setMarkers: bindActionCreators(mapActions.setMarkers, dispatch),
    setCluster: bindActionCreators(mapActions.setCluster, dispatch),
    setFilteredRoadObjects: bindActionCreators(dataActions.setFilteredRoadObjects, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RoadMapView);
