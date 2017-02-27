import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';
import RouteChooser from './src/route-chooser';


var NVDB = React.createClass({
  getInitialState() {
    return {
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <RouteChooser/>
      </View>
    );
  },
  mapRegionChanged(region) {
    this.setState({region});
  },

  mapPressed(press) {
    const coordinate = press.nativeEvent.coordinate;
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
