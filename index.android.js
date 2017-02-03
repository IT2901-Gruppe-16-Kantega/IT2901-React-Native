import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';

import APIWrapper from './APIWrapper';

var NVDB = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      signs: [],
      showMap: true,
    }
  },

  render() {
    if(this.state.showMap) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.mainView}
            region={this.state.region}
            onRegionChange={this.mapRegionChanged}
            showsUserLocation={true}
            onLongPress={this.mapPressed}
          >
            {this.state.signs.map(marker => (
              <MapView.Marker
                style={styles.marker}
                coordinate={marker.coordinates}
                title={'ID: ' + marker.id}
                description={'Skilt: ' + marker.title}
                key={marker.id}
                image={require('./src/assets/sign.png')}
                centerOffset={{x: 0.5, y: -1}}
                anchor={{x: 0.5, y: -1}}
              />
            ))}
          </MapView>
          <View style={styles.bottomView}>
            <TouchableHighlight underlayColor='gray' style={styles.button} onPress={this.reloadMap}>
              <Text style={styles.buttonText}>Reload {this.state.loadingProgress}</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='gray' style={styles.button} onPress={this.toggleState}>
              <Text style={styles.buttonText}>Toggle</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.mainView}
            aspect={Camera.constants.Aspect.fill}>
          </Camera>
          <View style={styles.bottomView}>
            <TouchableHighlight underlayColor='gray' style={styles.button} onPress={this.toggleState}>
              <Text style={styles.buttonText}>Toggle</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    }
  },

  getCenterOffsetForAnchor(anchor, markerWidth, markerHeight) {
   return {
     x: (markerWidth * 0.5) - (markerWidth * anchor.x),
     y: (markerHeight * 0.5) - (markerHeight * anchor.y),
   };
  },

  toggleState() {
    this.setState({showMap: !this.state.showMap});
  },

  mapRegionChanged(region) {
    this.setState({region});
  },

  mapPressed(press) {
    const coordinate = press.nativeEvent.coordinate;
    this.fetchObjectsAtPosition(coordinate.latitude, coordinate.longitude);
  },

  fetchObjectsAtPosition(latitude, longitude) {
    this.setState({
      signs: [],
    });

    APIWrapper.fetchSigns(latitude, longitude, 1, function(signs) {
      this.setState({signs: signs});
    }.bind(this));
  },

  reloadMap() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        this.setState({
          region: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }
        });
        this.fetchObjectsAtPosition(coords.latitude, coords.longitude)

      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 8,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 100,

  },
  buttonText: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('NVDB', () => NVDB);
