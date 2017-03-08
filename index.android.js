import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, View, Text} from 'react-native';
import RouteChooser from './old_src/route-chooser';
import {Provider} from 'react-redux'
import StartingView from './src/components/startingView'
import App from './src/index'
import store from './src/store'

var NVDB = React.createClass({
  getInitialState() {
    return {
    }
  },
  render() {
    return (
      <Provider store = {store}>
        <App/>
      </Provider>);
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('NVDB', () => NVDB);
