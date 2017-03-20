import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as templates from '../utilities/templates'
import MapView from 'react-native-maps';

import {fetchEgenskapstyper} from '../utilities/wrapper'

import { Footer } from './Footer';

//var region = null;
var listItems = [];
var selectedEgenskapID;
var selectedMarker = null;

// Create a reference to the map, to change it's region
var mapRef = null;
var latLongs = [];

// View that holds the map
var RoadMapView = React.createClass({
  componentWillMount() {
    /*let regionString = this.props.region;
    let geometryString = regionString.split('(')[1].slice(0, -1);
    let geometryParts = geometryString.split(' ');
    let objLat = parseFloat(geometryParts[0]);
    let objLong = parseFloat(geometryParts[1]);
    region = {
      latitude: objLat,
      longitude: objLong,
      latitudeDelta: 1,
      longitudeDelta: 1,
    }*/

    this.createMapMarkers();

    fetchEgenskapstyper(96, function(data) {
      for(var i = 0; i < data.egenskapstyper.length; i++) {
        listItems.push(data.egenskapstyper[i]);
      }
    })
  },

  render() {
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1.guid != r2.guid});
    var dataSource = ds.cloneWithRows(listItems);

    return <View style={styles.container}>
      <View style={styles.contentView}>
        <MapView
          ref={(ref) => {mapRef = ref}}
          onLayout = {() => mapRef.fitToCoordinates(latLongs, { edgePadding: { top: 20, right: 20, bottom: 20, left: 20 }, animated: true })}
          style={styles.map}
          onRegionChange={this.mapRegionChanged}
          onLongPress={this.mapPressed}
          onMarkerPress={this.markerPressed}
          zoomEnabled={true}
          >
          {this.state.markers}
        </MapView>
        <View style={StyleSheet.flatten([styles.sidebar, {flex: this.props.filterFlex}])}>
          <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          />
        </View>
      </View>
      <Footer />
    </View>
  },

  createMapMarkers() {

    // Goes through each fetched object, and creates a marker for the map.
    this.setState({markers: this.props.objects.map(function(roadObject) {
      const geometryString = roadObject.geometri.wkt.split('(')[1].slice(0, -1);
      const geometryParts = geometryString.split(' ');

      const objLat = parseFloat(geometryParts[0]);
      const objLong = parseFloat(geometryParts[1]);

      const latLong = {latitude: objLat, longitude: objLong};
      latLongs.push(latLong);

      const roadObjectID = roadObject.id;

      const roadObjectEgenskap = roadObject.egenskaper.find(function(element) {
        return element.id == selectedEgenskapID;
      });

      var chosenColor;
      chosenColor = selectedEgenskapID == null ? (roadObject.geometri.egengeometri ? 'green' : 'red') : (roadObjectEgenskap == undefined ? 'red' : 'green');

      /*if(roadObject.geometri.egengeometri) { chosenColor = 'green'; }
      else { chosenColor = 'red'; }*/

      const markerTitle = roadObjectEgenskap == undefined ? roadObjectID.toString() : roadObjectEgenskap.navn;
      const markerDescription = roadObjectEgenskap == undefined ? 'Velg et filter for å endre teksten' : roadObjectEgenskap.verdi.toString();

      return <MapView.Marker
        coordinate={latLong}
        title={markerTitle}
        description={markerDescription}
        key={roadObjectID}
        pinColor={chosenColor}
        />
    })});

    if(mapRef != null) {
      //mapRef.fitToCoordinates(latLongs, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false });
    }
  },

  hasCorrectID(element) {
    return element.id == this;
  },

  mapRegionChanged(region) {
    // Use for marker clustering.
  },

  mapPressed(press) {
    let coordinate = press.nativeEvent.coordinate;
  },

  markerPressed(marker) {
    selectedMarker = marker;
    console.log(marker);
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.selectFilter(rowData.id)} style={StyleSheet.flatten([styles.sidebarItemContainer, {flex: this.props.filterFlex}])}>
        <View>
          <Text style={styles.sidebarItem}>{rowData.navn}</Text>
        </View>
      </TouchableHighlight>
    )
  },

  selectFilter(id) {
    selectedEgenskapID = id;
    //selectedMarker.hideCallout();
    this.createMapMarkers();
    //selectedMarker.showCallout();
  }
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
  sidebarItemContainer: {
    height: 44,
  },
  sidebarItem: {
    color: templates.textColorWhite,
  },
  map: {
    flex: 1,
  },
})

//function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, null) (RoadMapView);
