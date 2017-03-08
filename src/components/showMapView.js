// view that holds the map
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

var region = {
  latitude: 63.43,
  longitude: 10.41,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

var ShowMapView = React.createClass({
  componentWillMount() {
    var regionString = this.props.currentRoadSearch.searchParameters[0].senterpunkt.wkt;
    var geometryString = regionString.split('(')[1].slice(0, -1);
    var geometryParts = geometryString.split(' ');
    var objLat = parseFloat(geometryParts[0]);
    var objLong = parseFloat(geometryParts[1]);
    region = {
      latitude: objLat,
      longitude: objLong,
      latitudeDelta: 1,
      longitudeDelta: 1,
    }
  },
  render() {
    return <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={this.mapRegionChanged}
          onLongPress={this.mapPressed}
          zoomEnabled={true}
          >

        {this.props.objects.map(function(object) {
          var geometryString = object.geometri.wkt.split('(')[1].slice(0, -1);
          var geometryParts = geometryString.split(' ');
          var objLat = parseFloat(geometryParts[0]);
          var objLong = parseFloat(geometryParts[1]);
          var LatLng = {latitude: objLat, longitude: objLong};
          var chosenColor = 'yellow';
          if(object.geometri.egengeometri==false){
            chosenColor = 'red';
          }
          else if (object.geometri.egengeometri==true){
            chosenColor = 'green';
          }
          var id = object.id;
          var stringID = id.toString();
          return <MapView.Marker
            coordinate={LatLng}
            title={stringID}
            description={stringID}
            key={stringID}
            pinColor={chosenColor}
            />
        })}
        </MapView>

      <View style={styles.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },
  mapRegionChanged(region) {
    //this.setState({region});
  },
  mapPressed(press) {
    const coordinate = press.nativeEvent.coordinate;
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
  },
  //Top-leve containers
  top: {
    flex: 0.7
  },
  contents: {
    flex: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    flex: 18,
  },
  mapPadding: {
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: templates.textColorWhite,
  },
})

function mapStateToProps(state) {
  return {
    objects: state.dataReducer.objects,
    region: state.searchReducer.region,
    //currentRoadSearchID: state.dataReducer.currentRoadSearchIndex,
    currentRoadSearch: state.dataReducer.allSearches[state.dataReducer.currentRoadSearchIndex],

  };}
//function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, null) (ShowMapView);
